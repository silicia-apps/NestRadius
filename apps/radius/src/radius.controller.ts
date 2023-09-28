import { Controller, Inject, Logger, UseGuards } from '@nestjs/common';

import { RadiusService } from './radius.service';
import { IncomingMessage, UDPGateWay } from '@silicia/core';
import { Payload, ClientProxy } from '@nestjs/microservices';
import * as radius from 'radius';
import { ConfigService } from '@nestjs/config';
import { RadiusGuard } from './radius.guard';

@UDPGateWay()
@Controller('auth')
export class RadiusController {
  private logger: Logger;
  private secret: string;

  constructor(
    private readonly radiusService: RadiusService,
    
  ) {
    this.logger = new Logger(RadiusController.name);
    this.logger.debug('Start Radius Controller');
  }

  @IncomingMessage()
  @UseGuards(RadiusGuard)
  public async message(
    @Payload() data: any,
    //@Ctx() rinfo: RemoteInfo,
  ): Promise<any> {
    const packet = radius.decode({ packet: data, secret: this.secret });
    console.log(JSON.stringify(packet));
    if (packet.code != 'Access-Request') {
      this.logger.debug('unknown packet type: ', packet.code);
      return;
    }
    this.radiusService.auth(
      packet.attributes['User-Name'],
      packet.attributes['User-Password']
    );
  }
}
