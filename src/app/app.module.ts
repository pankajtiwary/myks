import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { MyFlatPage } from '../pages/myflat-page/myflat-page';
import { UsersListPage } from '../pages/users/users-list/users-list';
import { UserDetailsPage } from '../pages/users/user-details/user-details';
import { CreateUserPage } from '../pages/users/create-user/create-user-page';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {NoticeBoardPage} from '../pages/noticeboard/noticeboard';
import {SettingPage} from '../pages/setting-page/setting-page';
import {ServicePage} from '../pages/service-page/service-page';
import {RequestListPage} from '../pages/service-page/request-list/request-list-page';
import {RequestDetailPage} from '../pages/service-page/request-list/request-detail-page/request-detail-page';
import {HelperPage} from '../pages/service-page/helper-page/helper-page';
import {RequestPage} from '../pages/service-page/request-page/request-page';
import {RequestSubmittedPage} from '../pages/service-page/request-page/request-submitted-page/request-submitted-page';
import { RequestFilterPage } from '../pages/service-page/request-filter-page/request-filter-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApartmentDataService} from '../common/apartdata.service';
// import {MyFamilyService} from '../common/myfamily.service';
import { IonicStorageModule } from '@ionic/storage';
import { ApartmentName } from '../common/apartmentname/apartmentname';
import {LoadingControllerService} from '../common/loadingcontrollerservice';
import {RequestListComp} from '../common/request-list-comp/request-list-comp';
import {HomePageBlock} from '../common/homepageblock/homepageblock';
import { HomePage } from '../pages/home/homepage';
import {RatingComponent} from '../common/rating-comp/rating-comp';
import {ServiceTypeService} from '../common/service-type-service';
import { MemeberTypeService } from '../common/member-type-service';
import { UserService } from '../common/user-service';
import { ManageServices } from '../common/manage-services';
import {SigninPage} from '../pages/admin/auth/signin/signin-page';
import {AdminWorklistPage} from '../pages/admin/admin-worklist/admin-worklist-page';
import { RequestBreakdownPage } from '../pages/admin/request-breakdown-page/request-breakdown-page';
import { LocalStorageService } from '../common/local-storage-service';
import { CustomLoadingController } from '../common/custom-loading-controller';
import { SwimmingPassPage } from '../pages/users/swimming-pass/swimming-pass-page';

import { ImageUploaderService } from '../pages/users/create-user/image-uploader-service';

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
    RequestPage,
    RequestSubmittedPage,
    RequestListPage,
    RequestListComp,
    RequestDetailPage,
    RatingComponent,
    SigninPage,
    AdminWorklistPage,
    CreateUserPage,
    RequestBreakdownPage,
    RequestFilterPage,
    SwimmingPassPage
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
    RequestPage,
    RequestSubmittedPage,
    RequestListPage,
    RequestDetailPage,
    SigninPage,
    AdminWorklistPage,
    CreateUserPage,
    RequestBreakdownPage,
    RequestFilterPage,
    SwimmingPassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApartmentDataService,
    LoadingControllerService,
    // MyFamilyService,
    FileTransfer,
    // FileUploadOptions,
    FileTransferObject,
    File,
    Camera,
    ServiceTypeService,
    MemeberTypeService,
    UserService,
    LocalStorageService,
    CustomLoadingController,
    ImageUploaderService,
    ManageServices
  ]
})
export class AppModule {}
