import {
  ParseIntPipe,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { LogService } from '../log/log.service';
import { RoleEntity } from './role.entity';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logService: LogService,
  ) {}

  @Get()
  async list() {
    this.logService.log('role list');
    return await this.roleService.list();
  }

  @Get(':id')
  async detail(
    @Param('id', new ParseIntPipe()) id,
  ) {
    return  await this.roleService.detail(id);
  }

  @Post()
  async create(
    @Body() body: RoleEntity
  ): Promise<RoleEntity> {
    this.logService.log('creat role');
    return await this.roleService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id,
    @Body() body: RoleEntity
  ) {
    this.logService.log('update role');
    return await this.roleService.update(
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
    this.logService.log('remove role');
    return await this.roleService.delete(id)
  }
}
