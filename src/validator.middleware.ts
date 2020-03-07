import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as Pino                                     from 'pino';
import { NextFunction }                              from 'express';

@Injectable()
export class ValidatorMiddleware implements NestMiddleware {
  private logger: Pino.Logger = Pino({ level: 'debug', messageKey: 'msg' });

  use(req: any, res: any, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.logger.info('Large body', { data_s: JSON.stringify(req.body) });
    next(new HttpException('invalid', 500));
  }
}
