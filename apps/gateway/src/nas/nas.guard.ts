import { CanActivate, ExecutionContext, Injectable, Logger, Rpc } from '@nestjs/common';
import { NasService } from 'apps/nas/src/nas.service';
import { Observable } from 'rxjs';

@Injectable()
export class NasGuard implements CanActivate {
  private logger: Logger;
  constructor(
    private nas: NasService,
  ) {
    this.logger = new Logger(NasGuard.name);
  }
  async canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      this.nas.lookup()
    }
    return true;
  }
}
