import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'request-detail-page',
    templateUrl: 'request-detail-page.html'
  })
export class RequestDetailPage {

    request:any;
    constructor(private navCtrl:NavController, private navParam: NavParams) {
        this.request = this.navParam.get('request');
        this.request.requestor = "Pankaj Tiwary";
        this.request.flat= "503, Lotus";
        console.log(this.request);
    }

    getRequestData() {
        
    }

}