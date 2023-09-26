import { Injectable, Logger } from '@nestjs/common';
import { NestAppwriteService } from 'libs/nest-appwrite/src';

@Injectable()
export class UispService {
  private logger: Logger;
  constructor(private appwrite: NestAppwriteService) {
    this.logger = new Logger('uispService');
    this.logger.debug('Create Uisp Service');
  }
}
