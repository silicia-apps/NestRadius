import { Controller, Logger } from '@nestjs/common';
import { NasService } from './nas.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NasController {
  private logger: Logger;

  constructor(private readonly nasService: NasService) {
    this.logger = new Logger('NasController');
  }
  @EventPattern('nas:lookup')
  async reverseLookup(params: any) {
    this.logger.log('Try to get Nas from IP ' + params.ip);
    try {
      this.nasService.lookup(params.ip);
    } catch (e) {
      this.logger.error('Failed to get NAS');
    }
  }
}
