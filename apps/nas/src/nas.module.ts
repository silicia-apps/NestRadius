import { Module } from '@nestjs/common';
import { NasController } from './nas.controller';
import { NasService } from './nas.service';

@Module({
  imports: [],
  controllers: [NasController],
  providers: [NasService],
})
export class NasModule {}
