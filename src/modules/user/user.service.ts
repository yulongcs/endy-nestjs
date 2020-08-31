import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserService implements OnModuleInit {
  onModuleInit() {
    // 初始化主模块后调用
    console.log(`The module has been initialized.`);
  }

  onApplicationBootstrap() {
    // 在应用程序完全启动并引导后调用
  }

  onModuleDestroy() {
    // 在Nest销毁主模块(app.close()方法之前进行清理)
  }

  beforeApplicationShutdown() {
    // 响应系统信号(当应用程序关闭时，例如SIGTERM)
  }

  async getPromiseList(): Promise<any[]> {
    return [
      {
        id: 0,
        promise: '菜单一权限'
      }
    ]
  }
}
