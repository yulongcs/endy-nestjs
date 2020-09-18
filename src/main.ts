import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
// import { AuthGuard } from 'src/guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// 引入包
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置中间件使用session,加盐是123456(随便写的)
  app.use(session({ secret: '123456', cookie: { maxAge: 60000 } }));

  // 类型使用中间件的方式在全局使用守卫(不建议这样使用,颗粒度不够细)
  // app.useGlobalGuards(new AuthGuard())

   // 使用拦截器
   app.useGlobalInterceptors(new LoggingInterceptor())

   // 使用管道
   app.useGlobalPipes(new ValidationPipe());

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
