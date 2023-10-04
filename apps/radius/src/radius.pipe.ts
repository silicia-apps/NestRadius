import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import * as radius from 'radius';

@Injectable()
export class RadiusPipe implements PipeTransform {
  private logger = new Logger(RadiusPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`Try to decode packet`);
    value = radius.decode({ packet: value });
    return value;
  }
}
