import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Request,
  UploadedFile,
  UseInterceptors,
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

import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '../auth/auth.guard';

import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { CommentService } from '../comment/comment.service';
import { CreateCommentRequest } from '../comment/dto/create.comment.dto';
import { UpdateCommentRequest } from '../comment/dto/update.comment.dto';
import { PostResponse } from './dto/retrieve.post.dto';
import { DeleteResult } from 'typeorm';
import { PostEntity } from './post.entity';
import { ReplyPostRequest } from './dto/reply.post.dto';
import { BulkDeleteDto } from './dto/bulk.delete.post.dto';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUploadBizDirectory(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }
      return await this.postService.processCsvFile(file.buffer);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete('bulk-delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Bulk delete posts' })
  @ApiResponse({ status: 204, description: 'Posts successfully deleted' })
  async bulkDeletePosts(@Body() bulkDeleteDto: BulkDeleteDto) {
    await this.postService.bulkDelete(bulkDeleteDto.ids);
  }

  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiTags('post')
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  @PaginatedSwaggerDocs(PostResponse, {
    sortableColumns: ['createdAt', 'viewCount'],
    searchableColumns: ['title', 'body', 'category', 'subCategory'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async getPosts(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<PostEntity>> {
    try {
      return this.postService.findAll(query);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostResponse })
  @Get(':postId')
  @HttpCode(HttpStatus.OK)
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
  @ApiOperation({ summary: '답글 생성' })
  @ApiTags('post')
  @ApiResponse({ status: 200, type: PostResponse })
  @Post('reply')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async replyPost(@Request() req, @Body() replyPostRequest: ReplyPostRequest) {
    try {
      const userId = req.user.id;

      return this.postService.reply({ ...replyPostRequest, userId });
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

  @Patch(':postId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async pinPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('isAdvertise') isAdvertise: boolean,
  ) {
    try {
      return this.postService.toggleIsAdvertise(postId, isAdvertise);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiTags('post')
  @ApiResponse({ status: 200 })
  @Get(':postId/comment')
  @HttpCode(HttpStatus.OK)
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
