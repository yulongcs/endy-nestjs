import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  Res,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UserService } from '../user/user.service'
import { LogService } from '../log/log.service';

import { UserEntity } from './user.entity';
import { RoleEntity } from  '../role/role.entity';

import { AuthGuard } from 'src/guard/auth.guard';

@Controller('user')
@UseGuards(AuthGuard) // 在控制器层面控制
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Get()
  async list() {
    this.logService.log('list');
    return await this.userService.list();
  }

  @Get(':id')
  async detail(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return  await this.userService.detail(id);
  }

  @Post()
  @Transaction()
  @UseGuards(AuthGuard) // 该接口被守卫了
  async create(
    @Body() body: Extract<UserEntity, RoleEntity>,
    @TransactionManager() manager: EntityManager,
  ){
    this.logService.log('add user');
    return await this.userService.create(body, manager);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: UserEntity
  ) {
    this.logService.log('update user');
    return await this.userService.update(
      {
        id,
        ...body,
      }
    )
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseIntPipe()) id,
  ) {
    this.logService.log('remove user');
    return await this.userService.delete(id)
  }

  @Post('/login')
  async login(
    @Body() body, 
    @Req() req, 
    @Res() res
    ) {
    this.logService.log('login');
    const { id } = body;
    const user = await this.userService.detail(Number(id));
    this.logService.log(JSON.stringify(user));
    if (user) {
      req.session.user = user;
      res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60, httpOnly: true });
      return res.redirect('/post');
    }

    return res.status(500).json({ msg: '用户不存在' });
  }
}
