import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { BannerService } from './banner.service';
import { CreateBannerRequest } from './dto/create.banner.dto';
import { UpdateBannerRequest } from './dto/update.banner.dto';
import { BannerResponse } from './dto/retrieve.banner.dto';
import { DeleteResult } from 'typeorm';
import { BulkDeleteDto } from './dto/bulk.delete.post.dto';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '배너 목록 조회' })
  @ApiTags('banner')
  @ApiResponse({ status: 200, type: [BannerResponse] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('')
  async getBizDirectory() {
    try {
      return await this.bannerService.getBanner();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('bulk-delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Bulk delete banners' })
  @ApiResponse({ status: 204, description: 'Banners successfully deleted' })
  async bulkDeletePosts(@Body() bulkDeleteDto: BulkDeleteDto) {
    await this.bannerService.bulkDelete(bulkDeleteDto.ids);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '배너 등록' })
  @ApiTags('banner')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('')
  async createBizDirectory(@Body() createBannerRequest: CreateBannerRequest) {
    try {
      return await this.bannerService.createBanner(createBannerRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '배너 삭제' })
  @ApiTags('banner')
  @ApiResponse({ status: 200, type: DeleteResult })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':banerId')
  async deleteBizDirectory(@Param('banerId', ParseIntPipe) banerId: number) {
    try {
      return await this.bannerService.deleteBanner(banerId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '배너 수정' })
  @ApiTags('banner')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':banerId')
  async updateBizDirectory(
    @Param('banerId', ParseIntPipe) banerId: number,
    @Body() updateBannerRequest: UpdateBannerRequest,
  ) {
    try {
      return await this.bannerService.updateBanner(
        banerId,
        updateBannerRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
