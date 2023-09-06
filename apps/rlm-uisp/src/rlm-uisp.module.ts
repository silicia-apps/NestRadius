import { Module } from '@nestjs/common';
import { RlmUispController } from './rlm-uisp.controller';
import { RlmUispService } from './rlm-uisp.service';

@Module({
  imports: [],
  controllers: [RlmUispController],
  providers: [RlmUispService],
})
export class RlmUispModule {}
