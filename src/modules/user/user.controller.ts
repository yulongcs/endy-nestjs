import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Render,
  Req,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service'
import { LogService } from '../log/log.service';

@Controller('user')
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
  async user(
    @Param('id', new ParseIntPipe()) id,
  ) {
    return  await this.userService.detail(id);
  }

  @Post()
  async addUser(
    @Body() body: any
  ) {
    const { name } = body;
    const userList = await this.userService.list();
    const [user] = userList.sort(item => item.id);

    this.logService.log('add user');
    return await this.userService.add({
      id: user.id + 1,
      name: name,
    })
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: any
  ) {
    this.logService.log('update user');
    return await this.userService.update(
      {
        id,
        name: body.name
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
