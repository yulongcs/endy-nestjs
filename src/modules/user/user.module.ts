import { Module, ValidationPipe } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../log/log.module';
import { AuthGuard } from 'src/guard/auth.guard';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { LoginController } from './login/login.controller';

@Module({
  imports: [LogModule.register('user')],
  providers: [
    UserService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 在需要使用的模块中采用依赖注入的方式使用
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // 在模块中依赖注入的方式使用管道
    }
  ],
  controllers: [UserController, LoginController],
})
export class UserModule {}
