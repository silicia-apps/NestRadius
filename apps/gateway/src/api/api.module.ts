import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          password: 'F2WKqQDnvGwppP5KnmaQIMYu',
          host: '185.13.223.52',
          port: 9000,
        },
      },
    ]),
  ],
  controllers: [ApiController],
})
export class ApiModule {}
