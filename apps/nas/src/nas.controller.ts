import { Controller, Get } from '@nestjs/common';
import { NasService } from './nas.service';

@Controller()
export class NasController {
  constructor(private readonly nasService: NasService) {}

  @Get()
  getHello(): string {
    return this.nasService.getHello();
  }
}
