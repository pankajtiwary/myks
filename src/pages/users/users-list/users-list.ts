import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {UserDetailsPage} from '../user-details/user-details'
import {LoadingControllerService} from '../../../common/loadingcontrollerservice';
import {MyFamilyService} from '../../../common/myfamily.service';
@Component({
    selector: 'users-list',
    templateUrl: 'users-list.html'
  })
export class UsersListPage {

  users:any[];
  admin:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private loadingCrt:LoadingControllerService, private myFamily: MyFamilyService) {
    this.admin = this.navParams.get('admin');
    this.users = myFamily.getMyFamilyData();
    this.loadingCrt.hide();
  }

  userTapped(user) {
    this.navCtrl.push(UserDetailsPage, {user:user});
  }

  getIconName(status:string) {
    if(status === "expired") {
      return "thumbs-down";
    }else if(status === "aboutToExpired") {
      return "alert";
    } else {
      return "thumbs-up";
    }
  }
  getColorName(status) {
    if(status === "expired") {
      return "danger";
    }else if(status === "aboutToExpired") {
      return "warn";
    } else {
      return "secondary";
    }

  }

  addNewMember() {

  }

}