import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BizDirectoryEntity } from './biz_directory.entity';
import { UpdateBizDirectoryRequest } from './dto/update.biz_directory.dto';
import { CreateBizDirectoryRequest } from './dto/create.biz_directory.dto';
import { BizDirectoryResponse } from './dto/retrieve.biz_directory.dto';

@Injectable()
export class BizDirectoryService {
  constructor(
    @InjectRepository(BizDirectoryEntity)
    private readonly bizDirectoryRepository: Repository<BizDirectoryEntity>,
  ) {}

  async createBizDirectory(
    createBizDirectoryRequest: CreateBizDirectoryRequest,
  ): Promise<BizDirectoryResponse> {
    return this.bizDirectoryRepository.save(createBizDirectoryRequest);
  }

  async updateBizDirectory(
    id: number,
    updateBizDirectoryRequest: UpdateBizDirectoryRequest,
  ) {
    await this.bizDirectoryRepository.update(id, updateBizDirectoryRequest);
  }

  async deleteBizDirectory(id: number): Promise<void> {
    await this.bizDirectoryRepository.delete(id);
  }

  async getBizDirectoryById(id: number): Promise<BizDirectoryResponse> {
    return this.bizDirectoryRepository.findOne({
      where: { id },
    });
  }

  async getBizDirectory(): Promise<BizDirectoryResponse[]> {
    return this.bizDirectoryRepository.find();
  }
}
