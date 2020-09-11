import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
} from "typeorm";

import { PostEntity } from "../post/post.entity";
import { RoleEntity } from "../role/role.entity";

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    name: 'username', // 如果是一样的可以不指定
    comment: '用户名'
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'password',
    comment: '密码'
  })
  password: string;

  @Column('tinyint', {
    nullable: false,
    default: () => 0,
    name: 'is_del',
    comment: '是否删除,1表示删除,0表示正常'
  })
  isDel: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at', // mysql数据库规范是使用下划线命名的,不使用驼峰
    comment: '创建时间'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  // 一对多,自然Posts实体类中就是多对一的方式
  // post => post.user表示从post表中查询到user数据
  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  @ManyToMany(() => RoleEntity, role => role.users)
  roles: RoleEntity[];
}

export type UserEntityDataType = DeepPartial<UserEntity>;