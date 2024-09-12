import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

import serviceAccountKey from '../../../serviceAccountKey.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private static firebaseApp: admin.app.App;

  constructor(private configService: ConfigService) {}

  private init() {
    if (!FirebaseService.firebaseApp) {
      FirebaseService.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccountKey as admin.ServiceAccount,
        ),

        databaseURL: this.configService.get<string>('FIREBASE_DB_URL'),
      });
    }
    return FirebaseService.firebaseApp;
  }

  onModuleInit() {
    this.init();
  }

  getMessaging(): admin.messaging.Messaging {
    return this.init().messaging();
  }

  getDatabase(): admin.database.Database {
    return this.init().database();
  }
}
