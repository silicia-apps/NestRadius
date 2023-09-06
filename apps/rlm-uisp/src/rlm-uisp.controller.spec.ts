import { Test, TestingModule } from '@nestjs/testing';
import { RlmUispController } from './rlm-uisp.controller';
import { RlmUispService } from './rlm-uisp.service';

describe('RmlUispController', () => {
  let rmlUispController: RlmUispController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RlmUispController],
      providers: [RlmUispService],
    }).compile();

    rmlUispController = app.get<RlmUispController>(RlmUispController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(rmlUispController.getHello()).toBe('Hello World!');
    });
  });
});
