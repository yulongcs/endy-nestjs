import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../log/log.module';
import { AuthGuard } from 'src/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [LogModule.register('user')],
  providers: [UserService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 在需要使用的模块中采用依赖注入的方式使用
    }],
  controllers: [UserController],
})
export class UserModule {}
