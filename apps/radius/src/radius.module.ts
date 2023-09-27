import { Module } from '@nestjs/common';
import { RadiusController } from './radius.controller';
import { RadiusService } from './radius.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          password: 'F2WKqQDnvGwppP5KnmaQIMYu',
          host: '185.13.223.52',
          port: 9000,
        },
      }])],
  controllers: [RadiusController],
  providers: [RadiusService],
})
export class RadiusModule { }
