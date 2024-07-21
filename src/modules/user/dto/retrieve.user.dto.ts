import { UserEntity } from '../user.entity';

export class UserProfileResponse {
  id: UserEntity['id'];
  uid: UserEntity['uid'];
  email: UserEntity['email'];
  bizName: UserEntity['biz_name'];
  name: UserEntity['name'];
  profileImageUrl: UserEntity['profile_image_url'];
  phoneNo: UserEntity['phone_no'];
  provider: UserEntity['provider'];
  isBiz: UserEntity['is_biz'];
  posts: UserEntity['posts'];
  comments: UserEntity['comments'];
  blocksMade: UserEntity['blocks_made'];
  blocksReceived: UserEntity['blocks_received'];
  reportsMade: UserEntity['reports_made'];
  reportsReceived: UserEntity['reports_received'];
}
