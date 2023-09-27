import { NestApplication, NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SocketType, RadiusServer } from './radius.server';
import { ConfigService } from '@nestjs/config';

import { RadiusModule } from './radius.module';

async function bootstrap() {
  const logger: Logger = new Logger('radius');
  const app = await NestFactory.create<NestApplication>(RadiusModule);
  const config = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new RadiusServer({
      bindOptions: {
        address: config.get('radius_address_bind'),
        port: config.get('radius_port_bind'),
      },
      socketOptions: {
        type: SocketType.UDP4,
      },
    }),
  });
  app.startAllMicroservices().then(() => this.logger.log('stop'));
}
bootstrap();

