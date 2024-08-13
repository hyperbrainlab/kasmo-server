import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BizDirectoryEntity } from './biz_directory.entity';
import { BizDirectoryService } from './biz_directory.service';
import { BizDirectoryController } from './biz_directory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BizDirectoryEntity])],
  providers: [BizDirectoryService],
  controllers: [BizDirectoryController],
  exports: [BizDirectoryService],
})
export class BizDirectoryModule {}
