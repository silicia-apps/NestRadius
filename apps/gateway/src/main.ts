import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SocketType, UdpServer } from './udp-server';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  const config = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new UdpServer({
      bindOptions: {
        address: config.get('radius_address_bind'),
        port: config.get('radius_port_bind'),
      },
      socketOptions: {
        type: SocketType.UDP4,
      },
    }),
  });
  app.startAllMicroservices();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  await app.listen(config.get('api_port_bind'), config.get('api_address_bind'));
}
bootstrap();
