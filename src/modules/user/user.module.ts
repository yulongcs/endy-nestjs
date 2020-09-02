import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule.register('user')],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
