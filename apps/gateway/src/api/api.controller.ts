import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Version,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class ApiController {
  logger = new Logger(ApiController.name);

  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @UseGuards(NasGuard)
  @Get('login')
  @Version('1')
  login(
    @Param('username') username: string,
    @Param('password') password: string,
  ): string {
    this.logger.debug(password + username);
    this.client.emit<string>('login', {
      username: username,
      password: 'password',
    });
    return 'username ' + username;
  }
}
