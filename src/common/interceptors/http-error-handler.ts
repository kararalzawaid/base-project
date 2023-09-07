import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException
} from '@nestjs/common';

@Injectable()
export class HttpErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(catchError(error => {
        if (error.response.statusCode) {
          const message = error.response.statusCode && error.response.message
            ? error.response.message
            : error.response.statusCode;

          throw new HttpException(message, error.response.statusCode);
        }

        const message = error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.statusText;

        throw new HttpException(message, error.response.status);
      }));
  }
}
