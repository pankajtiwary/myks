import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {UserDetailsPage} from '../user-details/user-details'
import {LoadingControllerService} from '../../../common/loadingcontrollerservice';
@Component({
    selector: 'users-list',
    templateUrl: 'users-list.html'
  })
export class UsersListPage {

  users:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCrt:LoadingControllerService) {
    this.users = [{firstName:"Pankaj", lastName:"Tiwary", 
                   gender:"Male", startDate:"20-Apr-2016", 
                   endDate:"20-Jun-2020", img:"assets/imgs/pankaj.jpg",
                   type:"owner",status:"expired"},

                   {firstName:"Sudha", lastName:"Tiwary", 
                   gender:"Female", startDate:"20-Apr-2016", 
                   endDate:"20-Jun-2020", img:"assets/imgs/sudha.JPG",
                   type:"owner",status:"aboutToExpired"},

                   {firstName:"Shaurya", lastName:"Tiwary", 
                   gender:"Male", startDate:"20-Apr-2016", 
                   endDate:"20-Jun-2020", img:"assets/imgs/shaurya.jpg",
                   type:"owner",status:"live"}]
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

}