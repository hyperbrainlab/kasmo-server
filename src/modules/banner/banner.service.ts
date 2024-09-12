import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BannerEntity } from './banner.entity';
import { UpdateBannerRequest } from './dto/update.banner.dto';
import { CreateBannerRequest } from './dto/create.banner.dto';
import { BannerResponse } from './dto/retrieve.banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
  ) {}

  async bulkDelete(ids: number[]): Promise<void> {
    await this.bannerRepository.delete(ids);
  }

  async createBanner(
    createBannerRequest: CreateBannerRequest,
  ): Promise<BannerResponse> {
    return this.bannerRepository.save(createBannerRequest);
  }

  async updateBanner(id: number, updateBannerRequest: UpdateBannerRequest) {
    await this.bannerRepository.update(id, updateBannerRequest);
  }

  async deleteBanner(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }

  async getBannerById(id: number): Promise<BannerResponse> {
    return this.bannerRepository.findOne({
      where: { id },
    });
  }

  async getBanner(): Promise<BannerResponse[]> {
    return this.bannerRepository.find();
  }
}
