import {
  ParseIntPipe,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Render,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { LogService } from '../log/log.service';
import { PostEntity } from './post.entity';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly logService: LogService,
  ) {}

  @Get()
  @Render('post') // 渲染views里面的ejs模板
  async list(
    @Request() req: { [key: string]: any }
  ) {
    this.logService.log(JSON.stringify(req.session));
    const { user } = req.session;
    const res = await this.postService.list();
    return {
      posts: res,
      user,
    }
  }

  @Get(':id')
  async detail(
    @Param('id', new ParseIntPipe()) id,
  ) {
    return  await this.postService.detail(id);
  }

  @Post()
  async create(
    @Body() body: PostEntity
  ) {
    this.logService.log('create post');
    return await this.postService.create(body);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: PostEntity
  ) {
    this.logService.log('update post');
    return await this.postService.update(
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
    this.logService.log('remove post');
    return await this.postService.delete(id)
  }
}
