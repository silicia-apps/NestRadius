import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('nas')
export class NasController {

  private logger : Logger;
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
    this.logger = new Logger(NasController.name);
  }
  
  @Get('reverseLookUp')
  async reverseLookUp(@Param('ip') ip: string) {
    this.client.emit('nas:reverseLookup', ip);
  }
}
