import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UsersListPage } from '../users/users-list/users-list';
import { RequestPage } from '../service-page/request-page/request-page';
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
        }else {
            this.navCtrl.push(RequestPage, {service:nextPage});
        }
    }

}