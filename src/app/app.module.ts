import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { LogInPage } from '../pages/login-page/login-page';
import { UsersListPage } from '../pages/users/users-list/users-list';
import { UserDetailsPage } from '../pages/users/user-details/user-details';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {NoticeBoardPage} from '../pages/noticeboard/noticeboard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApartmentDataService} from '../common/apartdata.service';
import { IonicStorageModule } from '@ionic/storage';
import { ApartmentName } from '../common/apartmentname/apartmentname';
import {LoadingControllerService} from '../common/loadingcontrollerservice';
import {HomePageBlock} from '../common/homepageblock/homepageblock';
import { HomePage } from '../pages/home/homepage';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LogInPage,
    UsersListPage,
    UserDetailsPage,
    NoticeBoardPage,
    ApartmentName,
    HomePageBlock,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LogInPage,
    UsersListPage,
    UserDetailsPage,
    NoticeBoardPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApartmentDataService,
    LoadingControllerService
  ]
})
export class AppModule {}
