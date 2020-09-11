import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule.register('user')],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
