import { Module } from '@nestjs/common';
import { NestAppwriteService } from './nest-appwrite.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [NestAppwriteService],
  exports: [NestAppwriteService],
})
export class NestAppwriteModule {}
