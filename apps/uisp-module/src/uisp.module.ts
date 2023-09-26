import { Module } from '@nestjs/common';
import { UispController } from './uisp.controller';
import { UispService } from './uisp.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UispController],
  providers: [UispService],
})
export class UispModule {}
