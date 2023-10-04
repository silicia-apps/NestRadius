import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { UispModule } from './uisp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('uisp-module:bootstrap');
  const app = await NestFactory.create(UispModule);
  const config = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      password: config.get('redis_password'),
      host: config.get('redis_host'),
      port: config.get('redis_port'),
    },
  });
  logger.verbose(
    'Connect to ' +
      config.get('redis_host') +
      ' port ' +
      config.get('redis_port'),
  );
  app.startAllMicroservices();
}
bootstrap();
