import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SocketType, UdpServer } from './udp-server';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new UdpServer({
        bindOptions: {
          address: '0.0.0.0',
          port: 1812,
        },
        socketOptions: {
          type: SocketType.UDP4,
        },
      }),
    },
  );
  await app.listen();
}
bootstrap();
