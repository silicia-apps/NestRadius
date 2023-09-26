import { Controller, Get, Logger } from '@nestjs/common';
import { NasService } from './nas.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NasController {
  private logger : Logger;

  constructor(private readonly nasService: NasService) {
    this.logger = new Logger('NasController');
  }
  
  @EventPattern('nas:reverseLookup')
  async reverseLookup(ip: string) {
    this.logger.log('Try to get Nas from IP ' + ip);
    try {
      this.nasService.getHello();
    } catch (e) {
      this.logger.error('Failed to get NAS');
    }
  }
}
