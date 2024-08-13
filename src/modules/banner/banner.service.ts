import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BannerEntity } from './banner.entity';
import { UpdateBizDirectoryRequest } from './dto/update.banner.dto';
import { CreateBizDirectoryRequest } from './dto/create.banner.dto';
import { BizDirectoryResponse } from './dto/retrieve.banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
  ) {}

  async createBanner(
    createBizDirectoryRequest: CreateBizDirectoryRequest,
  ): Promise<BizDirectoryResponse> {
    return this.bannerRepository.save(createBizDirectoryRequest);
  }

  async updateBanner(
    id: number,
    updateBizDirectoryRequest: UpdateBizDirectoryRequest,
  ) {
    await this.bannerRepository.update(id, updateBizDirectoryRequest);
  }

  async deleteBanner(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }

  async getBannerById(id: number): Promise<BizDirectoryResponse> {
    return this.bannerRepository.findOne({
      where: { id },
    });
  }

  async getBanner(): Promise<BizDirectoryResponse[]> {
    return this.bannerRepository.find();
  }
}
