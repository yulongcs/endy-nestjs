import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleRepository: Repository<RoleEntity>
  ) { }

  // 创建数据,传递一个对象类型的数据
  async create(
    data: Extract<UserEntity, RoleEntity>,
    manager: EntityManager
  ) {
    const { username, password, roleId } = data;
    const user = new UserEntity();
    user.username = username;
    user.password = password;
    user.isDel = 0;
    const role = await this.roleRepository.findOne(roleId, {
      relations: ['users'],
    });

    // user里面添加role
    user.roles = [role];

    // 场景user
    await manager.save(user);

    // 更新role
    await manager.update(
      RoleEntity,
      role,
      {
        users: [...role.users, role],
      }
    );

    return {
      sucess: true
    }
  }

  // 查询全部的数据
  async list(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['posts', 'roles']
    });
  }

  // 查询详情
  async detail(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'roles']
    });
  }

  // 更新user
  async update(user: UserEntity) {
    const { id, ...rest } = user;
    return this.userRepository.update(id, rest)
  }

  // 删除user
  async delete(id: number) {
    return this.userRepository.delete(id)
  }
}
