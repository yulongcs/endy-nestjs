import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../log/log.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  // 引入LogModule
  imports: [
    LogModule.forRoot('user'),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}