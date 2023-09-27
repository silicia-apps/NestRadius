import { Injectable } from '@nestjs/common';

@Injectable()
export class LdapService {
  getHello(): string {
    return 'Hello World!';
  }
}
