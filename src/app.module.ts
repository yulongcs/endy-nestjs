import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { PostService } from './modules/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';
import { RoleModule } from './modules/role/role.module';


@Module({
  imports: [
     // 配置加载配置文件
     ConfigModule.load(
       path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
       { 
         modifyConfigName: name => name.replace('.config', ''),
       }
     ),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: config.get('database.logging'),
      }),
      inject: [ConfigService],
    }),
    RoleModule,
  ], 
  controllers: [AppController, RoleController], // 该模块所用到的控制器
  providers: [AppService, UserService, PostService, RoleService],  // 该模块的提供者
  exports: [], // 别的模块要使用该模块中的某几个方法，就要在这里对外暴漏
})
export class AppModule {}
