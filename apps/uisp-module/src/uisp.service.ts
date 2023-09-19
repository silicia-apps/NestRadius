import { Injectable } from '@nestjs/common';

@Injectable()
export class UispService {
  getHello(): string {
    return 'Hello World!';
  }
}
