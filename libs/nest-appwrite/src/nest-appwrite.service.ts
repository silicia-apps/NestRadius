import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'node-appwrite';

@Injectable()
export class NestAppwriteService {
  private client = new Client()
  private logger = new Logger('SiliciaAppwriteService');

  constructor(private configService: ConfigService) {
    this.logger.log('connect to apprite');
    this.client.setEndpoint(configService.get('appwrite_endpoint'))
      .setProject(configService.get('apprite_project'))
      .setKey(configService.get('apprite_key'));
  }
}
