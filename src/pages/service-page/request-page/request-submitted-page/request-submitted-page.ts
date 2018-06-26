import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {ServicePage} from '../../service-page';
import {RequestListPage} from '../../request-list/request-list-page';

@Component({
    selector: 'request-submitted-page',
    templateUrl: 'request-submitted-page.html'
  })
export class RequestSubmittedPage {

    
    constructor(private navCtrl: NavController, private navParams: NavParams) {
    }

    anotherRequest() {
        this.navCtrl.setRoot(ServicePage);
    }

    myRequestList() {
        this.navCtrl.setRoot(RequestListPage);
    }
}