import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { IncomingMessage, UDPGateWay, UdpContext } from './udp-server';
import { Ctx, Payload } from '@nestjs/microservices';
import * as radius from 'radius';

@UDPGateWay()
@Controller()
export class AppController {
  private secret = '1234';
  constructor(private readonly appService: AppService) {
  
  }

  @IncomingMessage()
  public async message(@Payload() data, @Ctx() ctx: UdpContext) {
    console.log('Incoming Message');
    console.log(ctx);
    const packet = radius.decode({ packet: data, secret: this.secret });

    if (packet.code != 'Access-Request') {
      console.log('unknown packet type: ', packet.code);
      return;
    }

    const username = packet.attributes['User-Name'];
    const password = packet.attributes['User-Password'];

    console.log('Access-Request for ' + username);

    let code: string;
    if (username == 'jlpicard' && password == 'beverly123') {
      code = 'Access-Accept';
    } else {
      code = 'Access-Reject';
    }

    const response = radius.encode_response({
      packet: packet,
      code: code,
      secret: this.secret,
    });

    console.log('Sending ' + code + ' for user ' + username);
    this
  }
}
