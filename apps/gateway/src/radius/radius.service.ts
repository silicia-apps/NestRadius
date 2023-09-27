import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RadiusService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(RadiusService.name);
    this.logger.debug(`Create Radius Service`);
  }

  public async auth(username: string, password: string): Promise<boolean> {
    

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
