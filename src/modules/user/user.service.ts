import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';
import { LoginDTO } from './login/login.dto';
import NodeAuth from 'node-auth0';
import { jwt } from '../../utils/jwt';
import { RedisUtilsService } from '../redis-utils/redis-utils.service';

@Injectable()
export class UserService {
  private nodeAuth: NodeAuth;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly redisUtilsService: RedisUtilsService,
  ) {
    this.nodeAuth = new NodeAuth();
  }

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

  async login(data: LoginDTO): Promise<any | string> {
    // 根据用户名去查询数据,然后验证密码
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && this.nodeAuth.checkPassword(password, user.password)) {
      // 登录成功生成token、获取该用户的资源存到redis中
    // 1.生成token
    const token = jwt.createToken(String(user.id));
    // 2.token存到到redis中
    const redisData = {
      token,
      user,
    }
    this.redisUtilsService.set(String(user.id), redisData);
    return { ...user, token };
    } else {
      return '账号或密码错误';
    }
  }
}
