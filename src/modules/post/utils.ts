import { PostResponse } from './dto/retrieve.post.dto';
import { PostEntity } from './post.entity';

export const mapPostEntityToPostResponse = (
  post: PostEntity,
): PostResponse => ({
  id: post.id,
  title: post.title,
  body: post.body,
  category: post.category,
  comments: post.comments,
  user: post.user,
  viewCount: post.view_count,
  createdAt: post.created_at,
  updatedAt: post.updated_at,
});
