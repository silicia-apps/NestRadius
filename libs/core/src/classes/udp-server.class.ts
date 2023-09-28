import {
  createSocket,
  Socket,
  RemoteInfo,
} from 'dgram';

import { Logger } from '@nestjs/common';

import { INCOMING_MESSAGE_EVENT, LISTENING_EVENT } from '../constants';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';

import { UdpServerOption } from '../interfaces';

export class UdpServer extends Server implements CustomTransportStrategy {
  protected logger: Logger;
  public server: Socket;

  constructor(private readonly options: UdpServerOption) {
    super();
    this.logger = new Logger(UdpServer.name);
    this.logger.debug('Create UDP Server');
  }

  public async listen(callback: () => void) {
    try {
      this.logger.log('Starting Udp Server...');
      this.server = createSocket(this.options.socketOptions);
      this.server.bind(this.options.bindOptions);
    } catch (error: unknown) {
      this.logger.error('Error on start Server' + error);
    }

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
