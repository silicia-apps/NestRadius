import { Module } from '@nestjs/common';
import { UispController } from './uisp.controller';
import { UispService } from './uisp.service';

@Module({
  imports: [],
  controllers: [UispController],
  providers: [UispService],
})
export class UispModule {}
