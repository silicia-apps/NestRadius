import { Injectable, Logger } from '@nestjs/common';
import { NestAppwriteService, Query } from 'libs/nest-appwrite/src';

@Injectable()
export class NasService {
  private logger: Logger;
  constructor(private appwrite: NestAppwriteService) {
    this.logger = new Logger(NasService.name);
    this.logger.debug('Create NasService');
  }

  async lookup(ip: string) {
    try {
      this.appwrite.getDocuments('main', 'nas', [Query.equal('ip', ip)]);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
  }
}
