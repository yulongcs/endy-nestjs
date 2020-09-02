import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { PostService } from './modules/post/post.service';
import { PostModule } from './modules/post/post.module';
import { LogModule } from './modules/log/log.module';


@Module({
  imports: [UserModule, PostModule, LogModule], 
  controllers: [AppController], // 该模块所用到的控制器
  providers: [AppService, UserService, PostService],  // 该模块的提供者
  exports: [], // 别的模块要使用该模块中的某几个方法，就要在这里对外暴漏
})
export class AppModule {}
