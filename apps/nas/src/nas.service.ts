import { Injectable } from '@nestjs/common';

@Injectable()
export class NasService {
  getHello(): string {
    return 'Hello World!';
  }
}
