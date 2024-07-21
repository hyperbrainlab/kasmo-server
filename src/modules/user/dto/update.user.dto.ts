import { UserEntity } from '../user.entity';
export class UpdateUserRequest {
  email: UserEntity['email'];
  name: UserEntity['name'];
  profileImageUrl: UserEntity['profile_image_url'];
  phoneNo: UserEntity['phone_no'];
}
