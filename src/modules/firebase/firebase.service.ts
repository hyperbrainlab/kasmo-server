import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

import serviceAccountKey from '../../../serviceAccountKey.json';

@Injectable()
export class FirebaseService {
  private db: admin.database.Database;

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccountKey as admin.ServiceAccount,
        ),
        databaseURL: this.configService.get<string>('FIREBASE_DB_URL'),
      });
      this.db = admin.database();
    }
  }

  getDatabase() {
    return this.db;
  }
}
