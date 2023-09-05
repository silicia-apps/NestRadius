import { Injectable } from '@nestjs/common';

@Injectable()
export class RmlUispService {
  getHello(): string {
    return 'Hello World!';
  }
}
