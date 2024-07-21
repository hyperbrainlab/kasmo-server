import { CommentEntity } from '../comment.entity';

export class CommentResponse {
  id: CommentEntity['id'];

  body: CommentEntity['body'];

  post: CommentEntity['post'];

  parentComment: CommentEntity['parent_comment'];

  childComments: CommentEntity['child_comments'];

  user: CommentEntity['user'];
}
