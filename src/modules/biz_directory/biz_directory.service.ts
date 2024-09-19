import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'csv-parse';

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

  async bulkDelete(ids: number[]): Promise<void> {
    await this.bizDirectoryRepository.delete(ids);
  }

  async processCsvFile(
    fileBuffer: Buffer,
  ): Promise<{ processed: number; failed: number }> {
    return new Promise((resolve, reject) => {
      const results: CreateBizDirectoryRequest[] = [];
      let processed = 0;
      let failed = 0;

      parse(fileBuffer, {
        columns: true,
        skip_empty_lines: true,
      })
        .on('data', (data) => {
          results.push(data);
        })
        .on('error', (error) => {
          reject(
            new BadRequestException(
              'CSV 파싱 중 오류가 발생했습니다: ' + error.message,
            ),
          );
        })
        .on('end', async () => {
          for (const row of results) {
            try {
              await this.createBizDirectory(row);
              processed++;
            } catch (error) {
              console.error('데이터 처리 중 오류:', error);
              failed++;
            }
          }
          resolve({ processed, failed });
        });
    });
  }

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

  async setOwner(id: number, ownerId: number) {
    await this.bizDirectoryRepository.update(id, {
      owner: {
        id: ownerId,
      },
    });
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
