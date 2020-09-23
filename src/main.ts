import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
// import { AuthGuard } from 'src/guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 引入包
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  // 配置api文档信息
  const options = new DocumentBuilder()
    .setTitle('nest framework  api文档')
    .setDescription('nest framework  api接口文档')
    .setBasePath(PREFIX) // 设置基础的路径
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' }) // 设置请求头的token字段
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  // 配置中间件使用session,加盐是123456(随便写的)
  app.use(session({ secret: '123456', cookie: { maxAge: 60000 } }));

  // 类型使用中间件的方式在全局使用守卫(不建议这样使用,颗粒度不够细)
  // app.useGlobalGuards(new AuthGuard())

  // 使用拦截器
  app.useGlobalInterceptors(new LoggingInterceptor())

  // 使用管道
  app.useGlobalPipes(new ValidationPipe());

  // 统一异常过滤器，统一错误返回的格式
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'
  });
  // 配置视图文件的目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap();
