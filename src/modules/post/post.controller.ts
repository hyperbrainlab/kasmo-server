import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Request,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import {
  Paginate,
  PaginateQuery,
  PaginatedSwaggerDocs,
  Paginated,
} from 'nestjs-paginate';

import { AuthGuard } from '../auth/auth.guard';

import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { CommentService } from '../comment/comment.service';
import { CreateCommentRequest } from '../comment/dto/create.comment.dto';
import { UpdateCommentRequest } from '../comment/dto/update.comment.dto';
import { PostResponse } from './dto/retrieve.post.dto';
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
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  @PaginatedSwaggerDocs(PostResponse, {
    sortableColumns: ['createdAt', 'viewCount'],
    searchableColumns: ['title', 'body', 'category'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async getPosts(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<PostResponse>> {
    try {
      return this.postService.findAll(query);
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
  async createPost(
    @Request() req,
    @Body() createPostRequest: CreatePostRequest,
  ) {
    try {
      const userId = req.user.id;

      return this.postService.create({ ...createPostRequest, userId });
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
  @UsePipes(new ValidationPipe({ transform: false }))
  async createComment(
    @Request() req,
    @Body() createCommentRequest: CreateCommentRequest,
  ) {
    try {
      const userId = req.user.id;

      return this.commentService.create({ ...createCommentRequest, userId });
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
