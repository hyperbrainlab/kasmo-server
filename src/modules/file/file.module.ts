import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 20,
      },
    }),
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
