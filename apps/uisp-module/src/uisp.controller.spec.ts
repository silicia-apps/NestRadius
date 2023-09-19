import { Test, TestingModule } from '@nestjs/testing';
import { UispController } from './uisp.controller';
import { UispService } from './uisp.service';

describe('RmlUispController', () => {
  let uispController: UispController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UispController],
      providers: [UispService],
    }).compile();

    uispController = app.get<UispController>(UispController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(UispController).toBe('Hello World!');
    });
  });
});
