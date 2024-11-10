import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { BannerEntity } from './banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity]),
    FileModule,
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 20, // 20MB
      },
    }),
  ],
  providers: [BannerService],
  controllers: [BannerController],
  exports: [BannerService],
})
export class BannerModule {}
