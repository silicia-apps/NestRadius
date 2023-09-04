import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SocketType, UdpServer } from './udp-server';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new UdpServer({
        bindOptions: {
          address: '127.0.0.1',
          port: 8112 
        },
        socketOptions: {
          type: SocketType.UDP4,
        }
      })
    },
  );
  await app.listen();
}
bootstrap();
