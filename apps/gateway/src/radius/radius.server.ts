import {
  createSocket,
  BindOptions,
  SocketOptions,
  Socket,
  RemoteInfo,
} from 'dgram';
import { Logger } from '@nestjs/common';
import { INCOMING_MESSAGE_EVENT, LISTENING_EVENT } from './radius.constants';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';

export class UdpContext {
  constructor(
    private msg: Buffer,
    private rinfo: RemoteInfo,
  ) {}
}
export enum SocketType {
  UDP4 = 'udp4',
  UDP6 = 'udp6',
}
export interface UdpServerOption {
  bindOptions: BindOptions;
  socketOptions: SocketOptions;
}
export class UdpServer extends Server implements CustomTransportStrategy {
  protected logger = new Logger(UdpServer.name);
  public server: Socket;

  constructor(private readonly options: UdpServerOption) {
    super();
  }

  public async listen(callback: () => void) {
    this.server = createSocket(this.options.socketOptions);
    this.server.bind(this.options.bindOptions);
    this.server.on(LISTENING_EVENT, () => {
      const address = this.server.address();
      this.logger.log(
        `UDP Server listening on http://${address.address}:${address.port}`,
      );
    });
    this.server.on(
      INCOMING_MESSAGE_EVENT,
      async (msg: Buffer, rinfo: RemoteInfo) => {
        const handler = this.getHandlerByPattern(INCOMING_MESSAGE_EVENT);
        if (handler !== null) {
          const response = await handler(msg, rinfo);
          this.server.send(
            response,
            0,
            response.length,
            rinfo.port,
            rinfo.address,
            function (err) {
              if (err) {
                this.logger.error(
                  'Error sending response to ' +
                    rinfo.address +
                    ' on port ' +
                    rinfo.port,
                );
              }
            },
          );
        }
      },
    );
    callback();
  }

  public async close() {
    this.server.close();
    this.logger.error(`UDP Server close !`);
  }
}
