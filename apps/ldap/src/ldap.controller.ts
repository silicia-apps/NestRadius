import { Controller, Get } from '@nestjs/common';
import { LdapService } from './ldap.service';

@Controller()
export class LdapController {
  constructor(private readonly ldapService: LdapService) {}

  @Get()
  getHello(): string {
    return this.ldapService.getHello();
  }
}
