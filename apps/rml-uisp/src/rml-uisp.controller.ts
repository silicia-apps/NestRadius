import { Controller, Get } from '@nestjs/common';
import { RmlUispService } from './rml-uisp.service';

@Controller()
export class RmlUispController {
  constructor(private readonly rmlUispService: RmlUispService) {}

  @Get()
  getHello(): string {
    return this.rmlUispService.getHello();
  }
}
