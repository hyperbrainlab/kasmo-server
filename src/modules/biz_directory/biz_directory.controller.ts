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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { BizDirectoryService } from './biz_directory.service';
import { CreateBizDirectoryRequest } from './dto/create.biz_directory.dto';
import { UpdateBizDirectoryRequest } from './dto/update.biz_directory.dto';
import { BizDirectoryResponse } from './dto/retrieve.biz_directory.dto';
import { DeleteResult } from 'typeorm';
import { Paginate, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('biz')
export class BizDirectoryController {
  constructor(private bizDirectoryService: BizDirectoryService) {}

  @UseGuards(AuthGuard)
  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUploadBizDirectory(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }
      return await this.bizDirectoryService.processCsvFile(file.buffer);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '업소록 목록 조회' })
  @ApiTags('biz_directory')
  @ApiResponse({ status: 200, type: [BizDirectoryResponse] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('')
  @PaginatedSwaggerDocs(BizDirectoryResponse, {
    sortableColumns: ['createdAt'],
    searchableColumns: ['category'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async getBizDirectory(@Paginate() query: PaginateQuery) {
    try {
      return await this.bizDirectoryService.getBizDirectory(query);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '업소록 단건 조회' })
  @ApiTags('biz_directory')
  @ApiResponse({ status: 200, type: BizDirectoryResponse })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':bizDirectoryId')
  async getBizDirectoryById(
    @Param('bizDirectoryId', ParseIntPipe) bizDirectoryId: number,
  ) {
    try {
      return await this.bizDirectoryService.getBizDirectoryById(bizDirectoryId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '업소록 등록' })
  @ApiTags('biz_directory')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('')
  async createBizDirectory(
    @Body() createBizDirectoryRequest: CreateBizDirectoryRequest,
  ) {
    try {
      return await this.bizDirectoryService.createBizDirectory(
        createBizDirectoryRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '업소록 삭제' })
  @ApiTags('biz_directory')
  @ApiResponse({ status: 200, type: DeleteResult })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':bizDirectoryId')
  async deleteBizDirectory(
    @Param('bizDirectoryId', ParseIntPipe) bizDirectoryId: number,
  ) {
    try {
      return await this.bizDirectoryService.deleteBizDirectory(bizDirectoryId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '업소록 수정' })
  @ApiTags('biz_directory')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':bizDirectoryId')
  async updateBizDirectory(
    @Param('bizDirectoryId', ParseIntPipe) bizDirectoryId: number,
    @Body() updateBizDirectoryRequest: UpdateBizDirectoryRequest,
  ) {
    try {
      return await this.bizDirectoryService.updateBizDirectory(
        bizDirectoryId,
        updateBizDirectoryRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
