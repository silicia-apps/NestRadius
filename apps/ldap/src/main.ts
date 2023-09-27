import { NestFactory } from '@nestjs/core';
import { LdapModule } from './ldap.module';

async function bootstrap() {
  const app = await NestFactory.create(LdapModule);
  await app.listen(3000);
}
bootstrap();
