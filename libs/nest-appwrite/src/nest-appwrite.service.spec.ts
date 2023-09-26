import { Test, TestingModule } from '@nestjs/testing';
import { NestAppwriteService } from './nest-appwrite.service';

describe('NestAppwriteService', () => {
  let service: NestAppwriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestAppwriteService],
    }).compile();

    service = module.get<NestAppwriteService>(NestAppwriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
