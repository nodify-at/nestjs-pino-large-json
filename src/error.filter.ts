import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import * as Pino                                                from 'pino';
import { Response }                                             from 'express';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  private logger: Pino.Logger = Pino({ level: 'debug', messageKey: 'msg' });

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error('Invalid request', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
