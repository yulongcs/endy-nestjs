import { Controller, Get, Post, Query, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { AuthService } from '../auth/auth.service';
import { query } from 'express';

@Controller('user')
export class UserController {
  constructor (
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) { }

  /**
   *  浏览器访问的url地址:http://localhost:3000/user?name=hello&age=20
   * @param query 全部参数
   */
  @Get()
  async userList(
    @Query() query: any // @Query()获取全部的参数, 接收到的是一个对象
  ): Promise<any[]> {
    // 控制层访问服务层的userList方法
    this.logService.log('运行了userList控制器');
    return [];
  }

  /**
   * 浏览器访问的url地址:http://localhost:3000/user?name=hello&age=20
   * @param age 
   * @param name 
   */
  @Get()
  userList1(
    @Query('age', new ParseIntPipe()) age: number, // 只接收全部参数里面的其中一个或者多个,ParseIntPipe是nestjs中内置管道
    @Query('name') name: string
  ): string {
    // 我只要age和name字段,别的你传递多的给我，我也不接收也不处理
    console.log(age, name);
    return '用户列表'
  }

  /**
   * 浏览器访问的url地址:http://localhost:3000/user/2
   * @param params 
   */
  @Get(":id")
  userInfo(
    @Param() params:any
  ) {
    console.log(params); // 输出{ id: '2' }
    return "用户详情"
  }

  /**
   * 浏览器访问的url地址:http://localhost:3000/user1/2
   * @param id 
   */
  @Get(":id")
  userInfo1(
    @Param('id', new ParseIntPipe()) id: number
  ) {
    console.log(id);
    return "用户详情"
  }

  @Post()
  addUser(
    @Body() body: any
  ) {
    // 这种写法适合大规模的提交参数,自己又不想一个一个去校验
    // @Body()中加参数类似上面的方式一样的校验传递过来的参数[仅仅是针对参数比较少的情况下])
    console.log(body);
    return body
  }

  // 直接用get模拟下
  @Get()
  async login(): Promise<any[]> {
    // 从授权的模块中获取授权列表
    const auth = await this.authService.getPromiseList();
    return auth;
  }
}