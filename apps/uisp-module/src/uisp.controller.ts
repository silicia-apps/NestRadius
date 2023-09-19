import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RedisContext,
} from '@nestjs/microservices';
import { UispService } from './uisp.service';
// import { Observable } from 'rxjs';

@Controller()
export class UispController {
  constructor(private readonly uispService: UispService) {}

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
