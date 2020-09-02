import { Module, DynamicModule } from '@nestjs/common';
import { LogService } from './log.service';

@Module({
  // providers: [LogService],
  // exports: [LogService],
})
export class LogModule {
  static register(prefix: string): DynamicModule {
    return {
      module: LogModule,
      providers: [
        {
          provide: 'PREFIX',
          useValue: prefix,
        },
        LogService,
      ],
      exports: [LogService],
    }
  }
}
