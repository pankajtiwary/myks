import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { MyFlatPage } from '../pages/myflat-page/myflat-page';
import { UsersListPage } from '../pages/users/users-list/users-list';
import { UserDetailsPage } from '../pages/users/user-details/user-details';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {NoticeBoardPage} from '../pages/noticeboard/noticeboard';
import {SettingPage} from '../pages/setting-page/setting-page';
import {ServicePage} from '../pages/service-page/service-page';
import {HelperPage} from '../pages/service-page/helper-page/helper-page';
import {RequestPage} from '../pages/service-page/request-page/request-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApartmentDataService} from '../common/apartdata.service';
import {MyFamilyService} from '../common/myfamily.service';
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
    MyFlatPage,
    UsersListPage,
    UserDetailsPage,
    NoticeBoardPage,
    ApartmentName,
    HomePageBlock,
    HomePage,
    SettingPage,
    ServicePage,
    HelperPage,
    RequestPage
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
    MyFlatPage,
    UsersListPage,
    UserDetailsPage,
    NoticeBoardPage,
    HomePage,
    SettingPage,
    ServicePage,
    HelperPage,
    RequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApartmentDataService,
    LoadingControllerService,
    MyFamilyService
  ]
})
export class AppModule {}
