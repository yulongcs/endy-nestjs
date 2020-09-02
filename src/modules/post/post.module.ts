import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule.register('post')],
  providers: [PostService, UserService],
  controllers: [PostController, UserController]
})
export class PostModule {}
