import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { UispModule } from './uisp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('rlm-uisp:bootstrap');
  const server = '185.13.223.52';
  const port = 9000;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UispModule,
    {
      transport: Transport.REDIS,
      options: {
        password: 'F2WKqQDnvGwppP5KnmaQIMYu',
        host: server,
        port: port,
      },
    },
  );
  logger.verbose('Listen to ' + server + ' port ' + port);
  app.listen();
}
bootstrap();
