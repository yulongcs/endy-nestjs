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
import { PostService } from '../post/post.service';
import { LogService } from '../log/log.service';

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
  async post(
    @Param('id', new ParseIntPipe()) id,
  ) {
    return  await this.postService.detail(id);
  }

  @Post()
  async addPost(
    @Body() body: any
  ) {
    const postList = await this.postService.list();
    const [post] = postList.sort(item => item.id);

    this.logService.log('add post');
    return await this.postService.add({
      id: post.id + 1,
      title: body.title,
      content: body.content,
    })
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: any
  ) {

    this.logService.log('update post');
    return await this.postService.update(
      {
        id,
        title: body.title,
        content: body.content,
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
