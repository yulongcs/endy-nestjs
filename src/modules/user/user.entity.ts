import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
  BeforeInsert,
} from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import NodeAuth from 'node-auth0';
import jwt from 'jsonwebtoken';

import { PostEntity } from "../post/post.entity";
import { RoleEntity } from "../role/role.entity";

@Entity({ name: 'user' })
export class UserEntity {

  @Expose()
  private get token() {
    const { id, username, } = this;
    // 生成签名
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET, // 加盐
      {
        expiresIn: '7d', // 过期时间
      },
    );
  }

  /**
   * 定义返回数据,用了这个函数后上面的Exclude和Expose就失效了
   * @param isShowToken 
   */
  public toResponseObject(isShowToken = true): { [propsName: string]: any } {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nodeAuth, password, token, username, ...params } = this;
    const responseData = {
      username,
      ...params,
    }
    if (isShowToken) {
      return Object.assign(responseData, { token });
    } else {
      return responseData;
    }
  }

  @Exclude()
  private nodeAuth: NodeAuth;

  constructor() {
    this.nodeAuth = new NodeAuth();
  }

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

  @Exclude() // 排除返回字段,不返回给前端
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

  // @Expose()
  // isDelStr(): string {
  //   return this.isDel ? '删除' : '正常';
  // }

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

  @BeforeInsert()
  makePassword(): void {
    this.password = this.nodeAuth.makePassword(this.password);
  }
}

export type UserEntityDataType = DeepPartial<UserEntity>;