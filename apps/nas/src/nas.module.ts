import { Module } from '@nestjs/common';
import { NasController } from './nas.controller';
import { NasService } from './nas.service';
import { ConfigModule } from '@nestjs/config';
import { NestAppwriteModule } from 'libs/nest-appwrite/src/nest-appwrite.module';

@Module({
  imports: [ConfigModule.forRoot(), NestAppwriteModule],
  controllers: [NasController],
  providers: [NasService],
})
export class NasModule {}
