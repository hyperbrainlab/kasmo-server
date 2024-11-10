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
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { BannerService } from './banner.service';
import { CreateBannerRequest } from './dto/create.banner.dto';
import { UpdateBannerRequest } from './dto/update.banner.dto';
import { BannerResponse } from './dto/retrieve.banner.dto';
import { DeleteResult } from 'typeorm';
import { BulkDeleteDto } from './dto/bulk.delete.post.dto';
import { FileService } from '../file/file.service';

@Controller('banner')
export class BannerController {
  constructor(
    private bannerService: BannerService,
    private readonly fileService: FileService,
  ) {}

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
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 20, // 20MB
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('지원하지 않는 이미지 형식입니다'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        category: { type: 'string' },
        subCategory: { type: 'string' },
        description: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        order: { type: 'number' },
        enabled: { type: 'boolean' },
      },
    },
  })
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerRequest: CreateBannerRequest,
  ): Promise<BannerResponse> {
    try {
      if (!file) {
        throw new BadRequestException('이미지 파일이 필요합니다.');
      }

      const imageUrl = await this.fileService.uploadFile(file);
      return await this.bannerService.createBanner({
        ...createBannerRequest,
        imageUrl,
      });
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
  async deleteBanner(@Param('banerId', ParseIntPipe) bannerId: number) {
    try {
      return await this.bannerService.deleteBanner(bannerId);
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
  async updateBanner(
    @Param('banerId', ParseIntPipe) bannerId: number,
    @Body() updateBannerRequest: UpdateBannerRequest,
  ) {
    try {
      return await this.bannerService.updateBanner(
        bannerId,
        updateBannerRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
