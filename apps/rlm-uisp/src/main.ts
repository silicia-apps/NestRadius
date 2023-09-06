import { NestFactory } from '@nestjs/core';
import { RlmUispModule } from './rlm-uisp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlmUispModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://185.13.223.52:4222'],
      },
    },
  );
  app.listen();
}
bootstrap();
