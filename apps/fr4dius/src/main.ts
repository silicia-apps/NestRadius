import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SocketType, UdpServer } from './udp-server';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new UdpServer({
      bindOptions: {
        address: '0.0.0.0',
        port: 1812,
      },
      socketOptions: {
        type: SocketType.UDP4,
      },
    }),
  });
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
