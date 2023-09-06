import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { RlmUispModule } from './rlm-uisp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('rlm-uisp:bootstrap');
  const server = 'nats://185.13.223.52:4222'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlmUispModule,
    {
      transport: Transport.NATS,
      options: {
        queue: 'auth',
        servers: [server],
      },
    },
  );
  logger.verbose('Listen to ' + server);
  app.listen();
}
bootstrap();
