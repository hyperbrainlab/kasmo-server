import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';

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

  async getBizDirectory(
    query: PaginateQuery,
  ): Promise<Paginated<BizDirectoryEntity>> {
    const result = await paginate(query, this.bizDirectoryRepository, {
      sortableColumns: ['createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['category'],
      filterableColumns: {
        category: [FilterOperator.EQ],
      },
    });

    return result;
  }
}
