import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBlockEntity } from './user_block.entity';
import { UserBlockController } from './user_block.controller';
import { UserBlockService } from './user_block.service';

import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserBlockEntity])],
  providers: [UserBlockService],
  controllers: [UserBlockController],
  exports: [UserBlockService],
})
export class UserBlockModule {}
