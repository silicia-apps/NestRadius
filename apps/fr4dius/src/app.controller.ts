import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { IncomingMessage, UDPGateWay } from './udp-server';
import { Ctx, Payload } from '@nestjs/microservices';
import * as radius from 'radius';
import { RemoteInfo } from 'dgram';

@UDPGateWay()
@Controller()
export class AppController {
  private secret = '1234';
  constructor(private readonly appService: AppService) {}

  @IncomingMessage()
  public async message(
    @Payload() data,
    @Ctx() rinfo: RemoteInfo,
  ): Promise<any> {
    const packet = radius.decode({ packet: data, secret: this.secret });
    console.log(JSON.stringify(packet));
    if (packet.code != 'Access-Request') {
      console.log('unknown packet type: ', packet.code);
      return;
    }

    console.log(rinfo);
    const username = packet.attributes['User-Name'];
    const password = packet.attributes['User-Password'];

    console.log('Access-Request for ' + username + ' ' + password);

    let code: string;
    if (username == 'admin' && password == 'admin') {
      code = 'Access-Accept';
    } else {
      code = 'Access-Reject';
    }

    return radius.encode_response({
      packet: packet,
      code: code,
      secret: this.secret,
    });
  }
}
