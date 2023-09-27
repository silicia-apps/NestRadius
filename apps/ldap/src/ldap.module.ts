import { Module } from '@nestjs/common';
import { LdapController } from './ldap.controller';
import { LdapService } from './ldap.service';

@Module({
  imports: [],
  controllers: [LdapController],
  providers: [LdapService],
})
export class LdapModule {}
