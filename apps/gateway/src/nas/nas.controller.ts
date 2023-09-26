import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Version,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('nas')
export class NasController {
  private logger: Logger;
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
    this.logger = new Logger(NasController.name);
  }

  @Get('reverseLookUp')
  @Version('1')
  async reverseLookUp(@Query() params: any) {
    this.logger.log(`emit reverse lookup for nas with ip ${params.ip}`);
    this.client.emit<string>('nas:lookup', { ip: params.ip });
    return 'IP= ' + params.ip;
  }
}
