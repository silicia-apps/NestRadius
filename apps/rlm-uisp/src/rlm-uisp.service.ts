import { Injectable } from '@nestjs/common';

@Injectable()
export class RlmUispService {
  getHello(): string {
    return 'Hello World!';
  }
}
