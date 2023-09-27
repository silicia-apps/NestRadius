import { Test, TestingModule } from '@nestjs/testing';
import { LdapController } from './ldap.controller';
import { LdapService } from './ldap.service';

describe('LdapController', () => {
  let ldapController: LdapController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LdapController],
      providers: [LdapService],
    }).compile();

    ldapController = app.get<LdapController>(LdapController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ldapController.getHello()).toBe('Hello World!');
    });
  });
});
