import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sdk from 'node-appwrite';

@Injectable()
export class NestAppwriteService {
  private client = new sdk.Client();
  private database = new sdk.Databases(this.client);
  private logger = new Logger('SiliciaAppwriteService');

  constructor(private configService: ConfigService) {
    this.logger.log('connect to apprite');
    this.client
      .setEndpoint(configService.get('appwrite_endpoint'))
      .setProject(configService.get('apprite_project'))
      .setKey(configService.get('apprite_key'))
      .setSelfSigned(false);
  }

  async getDocuments(
    database: string,
    collection: string,
    query: string[],
  ): Promise<any> {
    try {
      return await this.database.listDocuments(database, collection, query);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
  }
}
