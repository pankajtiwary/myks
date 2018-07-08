import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UsersListPage } from '../users/users-list/users-list';
import { RequestPage } from '../service-page/request-page/request-page';
import {RequestListPage} from './request-list/request-list-page';
@Component({
    selector: 'service-page',
    templateUrl: 'service-page.html'
  })
export class ServicePage {


    constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    }

    nextPage(nextPage) {
        if(nextPage === 'swim') {
            this.navCtrl.push(UsersListPage);
        }else if(nextPage === 'myallrequest') {
            this.navCtrl.push(RequestListPage);
        } else {
            this.navCtrl.push(RequestPage, {serviceType:nextPage});
        }
    }

}