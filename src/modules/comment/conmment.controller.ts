import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { CommentService } from '../comment/comment.service';
import { CreateCommentRequest } from '../comment/dto/create.comment.dto';
import { UpdateCommentRequest } from '../comment/dto/update.comment.dto';
import { CommentResponse } from './dto/retrieve.comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getComments(@Query('postId', ParseIntPipe) postId: number) {
    try {
      return await this.commentService.findAll({ postId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComment(
    @Body() createCommentRequest: CreateCommentRequest,
  ): Promise<CommentResponse> {
    try {
      return await this.commentService.create(createCommentRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Delete(':commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return await this.commentService.delete(commentId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 업데이트' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Put(':commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentRequest: UpdateCommentRequest,
  ): Promise<CommentResponse> {
    try {
      return await this.commentService.update(commentId, updateCommentRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
