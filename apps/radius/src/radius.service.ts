import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import * as radius from 'radius';

@Injectable()
export class RadiusService {
  private logger: Logger;

  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) {
    this.logger = new Logger(RadiusService.name);
    this.logger.debug(`Create Radius Service`);
  }

  public async auth(username: string, password: string): Promise<boolean> {


    const pattern = 'login';
    /*const code = this.client.send<string>(pattern, {
      username: username,
      password: password,
    });*/
    return true;
    
  }
}
