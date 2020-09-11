import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';

// 引入包
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置中间件使用session,加盐是123456(随便写的)
  app.use(session({ secret: '123456', cookie: { maxAge: 60000 } }))

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'
  });
  // 配置视图文件的目录
  app.setBaseViewsDir(join(__dirname, '..', 'views')); 
  app.setViewEngine('ejs');
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}`);
  });
}
bootstrap();
