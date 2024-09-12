import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {}
