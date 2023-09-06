import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { IncomingMessage, UDPGateWay } from './udp-server';
import { Ctx, Payload, EventPattern, Client, Transport, ClientProxy } from '@nestjs/microservices';
import * as radius from 'radius';
import { RemoteInfo } from 'dgram';

@UDPGateWay()
@Controller()
export class AppController {
  @Client({
    transport: Transport.NATS,
    options: {
      url: 'nats://185.13.223.52:4222',
    },
  })
  client: ClientProxy;
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

    const username = packet.attributes['User-Name'];
    const password = packet.attributes['User-Password'];
    this.client.send('auth', { username: username, password: password, rinfo: rinfo });
    const code = 'Access-Reject';
    return radius.encode_response({
      packet: packet,
      code: code,
      secret: this.secret,
    });
  }
}
