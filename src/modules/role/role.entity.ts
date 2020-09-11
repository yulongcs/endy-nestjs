import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

@Entity({ name: 'role' })
export class RoleEntity {
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
    name: 'name',
    comment: 'role名称'
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description',
    comment: '描述'
  })
  content: string;

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
    name: 'created_at',
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

  @ManyToMany(() => UserEntity, user => user.roles)
  @JoinTable({ name: 'roles_users' }) // 需要指定这是关系的所有者方
  users: UserEntity[];
}