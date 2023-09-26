import { Test, TestingModule } from '@nestjs/testing';
import { NasController } from './nas.controller';

describe('NasController', () => {
  let controller: NasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NasController],
    }).compile();

    controller = module.get<NasController>(NasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
