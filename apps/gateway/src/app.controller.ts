import { Controller, Inject, Logger } from '@nestjs/common';

import { AppService } from './app.service';
import { IncomingMessage, UDPGateWay } from './udp-server';
import { Payload, ClientProxy } from '@nestjs/microservices';
import * as radius from 'radius';
import { ConfigService } from '@nestjs/config';

@UDPGateWay()
@Controller('auth')
export class AppController {
  private logger = new Logger(AppController.name);
  private secret = this.configService.get('radius_secret');
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @IncomingMessage()
  public async message(
    @Payload() data,
    //@Ctx() rinfo: RemoteInfo,
  ): Promise<any> {
    const packet = radius.decode({ packet: data, secret: this.secret });
    console.log(JSON.stringify(packet));
    if (packet.code != 'Access-Request') {
      this.logger.debug('unknown packet type: ', packet.code);
      return;
    }

    const username = packet.attributes['User-Name'];
    const password = packet.attributes['User-Password'];

    const pattern = 'login';
    const code = this.client.send<string>(pattern, {
      username: username,
      password: password,
    });
    return radius.encode_response({
      packet: packet,
      code: code,
      secret: this.secret,
    });
  }
}
