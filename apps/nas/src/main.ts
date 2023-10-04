import { NestFactory } from '@nestjs/core';
import { NasModule } from './nas.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('nas:bootstrap');
  const app = await NestFactory.create(NasModule);
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
    `Listen to ${config.get('redis_host')}:${config.get('redis_port')}`,
  );
  app.startAllMicroservices();
}
bootstrap();
