import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule } from 'angularfire2';
import { NewsProvider } from '../providers/news/news';
import { FCM } from '@ionic-native/fcm';
import { DetailPage } from '../pages/detail/detail';
export const firebaseConfig = {
  apiKey: "AIzaSyCLc3vtRULhmV5nNvW6ofXw8Le6NPC1g8o",
  authDomain: "wechat-2b611.firebaseapp.com",
  databaseURL: "https://wechat-2b611.firebaseio.com",
  projectId: "wechat-2b611",
  storageBucket: "wechat-2b611.appspot.com",
  messagingSenderId: "459435392019",
  appId: "1:459435392019:web:0547c8dcab74ef60"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsProvider
  ]
})
export class AppModule {}
