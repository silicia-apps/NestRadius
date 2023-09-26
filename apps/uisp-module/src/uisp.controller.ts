import { Controller, Logger } from '@nestjs/common';
import {
  Payload,
  Ctx,
  RedisContext,
  EventPattern,
} from '@nestjs/microservices';
import { UispService } from './uisp.service';
// import { Observable } from 'rxjs';

@Controller()
export class UispController {
  private logger = new Logger(UispController.name);
  constructor(private readonly uispService: UispService) {}

  @EventPattern('login')
  async login(
    @Payload() data: { username: string; password: string },
    @Ctx() context: RedisContext,
  ): Promise<string> {
    this.logger.debug(
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
