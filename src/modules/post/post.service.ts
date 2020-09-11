import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor (
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) { }

  // 创建数据,传递一个对象类型的数据
  async create(user: PostEntity): Promise<PostEntity> {
    return await this.postRepository.save(user);
  }

  // 查询全部的数据
  async list(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  // 查询详情
  async detail(id: number) {
    return this.postRepository.findOne({ where: { id }});
  }

  // 更新user
  async update(user: PostEntity) {
    const { id, ...rest} = user;
    return this.postRepository.update(id, rest)
  }

  // 删除user
  async delete(id: number) {
    return this.postRepository.delete(id)
  }
}
