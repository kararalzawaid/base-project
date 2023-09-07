import { Response } from 'express';
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : exception?.response?.status
        ? exception.response.status
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // @ TODO: enhance this if you get strange error
    const message =
      exception?.response?.message
      || exception?.response?.data?.message
      || exception
      || 'Internal server error';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(status)
      .json({ statusCode: status, message });
  }
}