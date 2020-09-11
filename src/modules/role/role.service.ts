import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) { }

  // 创建数据,传递一个对象类型的数据
  async create(user: RoleEntity): Promise<RoleEntity> {
    return await this.roleRepository.save(user);
  }

  // 查询全部的数据
  async list(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  // 查询详情
  async detail(id: number) {
    return this.roleRepository.findOne({ where: { id }});
  }

  // 更新user
  async update(user: RoleEntity) {
    const { id, ...rest} = user;
    return this.roleRepository.update(id, rest)
  }

  // 删除user
  async delete(id: number) {
    return this.roleRepository.delete(id)
  }
}
