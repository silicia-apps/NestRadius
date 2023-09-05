import { Module } from '@nestjs/common';
import { RmlUispController } from './rml-uisp.controller';
import { RmlUispService } from './rml-uisp.service';

@Module({
  imports: [],
  controllers: [RmlUispController],
  providers: [RmlUispService],
})
export class RmlUispModule {}
