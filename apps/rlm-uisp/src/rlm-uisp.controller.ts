import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, NatsContext, Ctx } from '@nestjs/microservices';
import { RlmUispService } from './rlm-uisp.service';
// import { Observable } from 'rxjs';

@Controller()
export class RlmUispController {
  constructor(private readonly rlmUispService: RlmUispService) {}

  @MessagePattern({ cmd: 'login' })
  login(@Payload() data: number[], @Ctx() context: NatsContext): boolean {
    console.log('Test user ' + data + ' password ' + context);
    return true;
  }
}
