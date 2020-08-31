import { Controller, Get } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) { }

  @Get()
  async userList(): Promise<any[]> {
    // 控制层访问服务层的userList方法
    this.logService.log('运行了userList控制器');
    return [];
  }

  // 直接用get模拟下
  @Get()
  async login(): Promise<any[]> {
    // 从授权的模块中获取授权列表
    const auth = await this.authService.getPromiseList();
    return auth;
  }
}