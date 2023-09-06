import { Test, TestingModule } from '@nestjs/testing';
import { RmlUispController } from './rlm-uisp.controller';
import { RmlUispService } from './rlm-uisp.service';

describe('RmlUispController', () => {
  let rmlUispController: RmlUispController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmlUispController],
      providers: [RmlUispService],
    }).compile();

    rmlUispController = app.get<RmlUispController>(RmlUispController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmlUispController.getHello()).toBe('Hello World!');
    });
  });
});
