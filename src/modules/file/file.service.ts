import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private readonly uploadPath = 'uploads/banners';

  constructor() {
    this.createUploadDirectory();
  }

  private async createUploadDirectory() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadPath, filename);

    await fs.writeFile(filePath, file.buffer);

    return `/banners/${filename}`;
  }
}
