import { UserProfileResponse } from './dto/retrieve.user.dto';
import { UserEntity } from './user.entity';

export const mapUserEntityToUserProfileResponse = (
  user: UserEntity,
): UserProfileResponse => ({
  id: user.id,
  uid: user.uid,
  email: user.email,
  bizName: user.biz_name,
  name: user.name,
  profileImageUrl: user.profile_image_url,
  phoneNo: user.phone_no,
  provider: user.provider,
  isBiz: user.is_biz,
  posts: user.posts,
  comments: user.comments,
  blocksMade: user.blocks_made,
  blocksReceived: user.blocks_received,
  reportsMade: user.reports_made,
  reportsReceived: user.reports_received,
});
