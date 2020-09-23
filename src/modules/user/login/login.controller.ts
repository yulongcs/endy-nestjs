import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService, } from '../user.service';
import { LoginDTO } from './login.dto';

@ApiTags('用户登录')
@Controller('login')
export class LoginController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: '用户登录',
    description: '用户名和密码登录',
  })
  @ApiCreatedResponse({
    type: LoginDTO,
    description: '用户登录DTO'
  })
  @Post()
  async login(
    @Body() loginData: LoginDTO,
  ): Promise<any | string> {
    return await this.userService.login(loginData);
  }
}
