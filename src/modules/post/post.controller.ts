import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { PostService } from './post.service';
import { CommentService } from '../comment/comment.service';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPosts(
    @Query('category') category: string,
    @Query('keyword') keyword: string,
  ) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Get(':post_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPostById(@Param('post_id') id: number) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost() {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Delete(':post_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deletePost(@Param('post_id') id: number) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 업데이트' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Put(':post_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePost(@Param('post_id') id: number) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Get(':post_id/comments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getComments(@Param('post_id') id: number) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Post(':post_id/comment')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComment(@Param('post_id') id: number) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Delete(':post_id/comment/:comment_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteComment(
    @Param('post_id') postId: number,
    @Param('comment_id') commentId: number,
  ) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 업데이트' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Put(':post_id/comment/:comment_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateComment(
    @Param('post_id') postId: number,
    @Param('comment_id') commentId: number,
  ) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
