import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 如果返回true的时候就可以继续往下走,如果访问false的时候就不继续往下走,以达到验证用户信息,常用于验证token是否失效类的
    return true;
  }
}
