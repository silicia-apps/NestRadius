import { NestFactory } from '@nestjs/core';
import { RmlUispModule } from './rml-uisp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RmlUispModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
      },
    },
  );
}
bootstrap();
