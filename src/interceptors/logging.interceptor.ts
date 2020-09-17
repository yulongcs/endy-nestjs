import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//使用拦截器计算接口的访问时间

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截器')
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}