import { Controller, Get } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly logService: LogService,
  ) { }

  @Get()
  async userList(): Promise<any[]> {
    // 控制层访问服务层的userList方法
    this.logService.log('运行了userList控制器');
    return [];
  }
}