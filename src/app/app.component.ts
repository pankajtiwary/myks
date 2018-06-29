import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { MyFlatPage } from '../pages/myflat-page/myflat-page';
import {NoticeBoardPage} from '../pages/noticeboard/noticeboard';
import {SettingPage} from '../pages/setting-page/setting-page';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
import { HomePage } from '../pages/home/homepage';
// import {RequestListPage} from '../pages/service-page/request-list/request-list-page';
import { SigninPage } from '../pages/admin/auth/signin/signin-page';
import { AdminWorklistPage } from '../pages/admin/admin-worklist/admin-worklist-page';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  // rootPage = HelloIonicPage;
  // rootPage = HelloIonicPage;
  rootPage = HomePage;
  // rootPage = AdminWorklistPage;
  pages: Array<{title: string, component: any, icon:string}>;
  showSplash = true; 

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'My Society', component: HomePage, icon:"home" },
      { title: 'Rules & Timings', component: HelloIonicPage, icon:"time" },
      // { title: 'Swimming Pool Timings', component: ListPage, icon:"" },
      { title: 'My Flat', component: MyFlatPage, icon:"paper"},
      { title: 'Notice Board', component: NoticeBoardPage, icon:"notifications" },
      { title: 'Settings', component: SettingPage, icon:"settings" },
      { title: 'Admin Sign in', component: SigninPage, icon:"contact"}
      
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
