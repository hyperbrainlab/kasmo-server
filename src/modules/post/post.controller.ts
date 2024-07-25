import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Query,
  Param,
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

import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { CommentService } from '../comment/comment.service';
import { CreateCommentRequest } from '../comment/dto/create.comment.dto';
import { UpdateCommentRequest } from '../comment/dto/update.comment.dto';
import { Categories, SortBy } from './constants';
import { PostResponse, PostListResponse } from './dto/retrieve.post.dto';
import { DeleteResult } from 'typeorm';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostListResponse })
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPosts(
    @Query('category') category?: Categories,
    @Query('keyword') keyword?: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('order') order?: SortBy,
  ) {
    try {
      return this.postService.paginate({
        category,
        keyword,
        page,
        size,
        order,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostResponse })
  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPostById(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostResponse> {
    try {
      await this.postService.addViewCount(postId);
      return await this.postService.findOneById(postId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostResponse })
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Body() createPostRequest: CreatePostRequest) {
    try {
      console.log({
        createPostRequest,
      });

      return this.postService.create(createPostRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: DeleteResult })
  @Delete(':postId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    try {
      return this.postService.delete(postId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 업데이트' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostResponse })
  @Put(':postId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostRequest: UpdatePostRequest,
  ) {
    try {
      return this.postService.update(postId, updatePostRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Get(':postId/comments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    try {
      return this.commentService.findAll({ postId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Post('comment')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComment(@Body() createCommentRequest: CreateCommentRequest) {
    console.log(createCommentRequest);

    try {
      return this.commentService.create(createCommentRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Delete('comment/:commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return this.commentService.delete(commentId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 업데이트' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: null })
  @Put('comment/:commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentRequest: UpdateCommentRequest,
  ) {
    try {
      return this.commentService.update(commentId, updateCommentRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
