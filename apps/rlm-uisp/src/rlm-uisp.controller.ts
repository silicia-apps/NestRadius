import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RedisContext,
} from '@nestjs/microservices';
import { RlmUispService } from './rlm-uisp.service';
// import { Observable } from 'rxjs';

@Controller()
export class RlmUispController {
  constructor(private readonly rlmUispService: RlmUispService) {}

  @MessagePattern({ cmd: 'login' })
  login(
    @Payload() data: { username: string; password: string },
    @Ctx() context: RedisContext,
  ): string {
    console.log(
      'Test user ' +
        data.username +
        ' password ' +
        data.password +
        ' context ' +
        context,
    );
    return 'ok';
  }
}
