import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'request-detail-page',
    templateUrl: 'request-detail-page.html'
  })
export class RequestDetailPage {

    request:any;
    rateReadOnly:string;
    constructor(private navCtrl:NavController, private navParam: NavParams) {
        this.request = this.navParam.get('request');
        this.request.requestor = "Pankaj Tiwary";
        this.request.flat= "503, Lotus";
        this.setRateReadOnlyParam();

        console.log(this.request);
    }

    onResolved() {
        this.request.status = 'done';
        let date = new Date();

        this.request.resolvedDate = date.toLocaleString();
        this.setRateReadOnlyParam();
    }

    setRateReadOnlyParam() {
        if (this.request.status === 'done') {
            this.rateReadOnly = 'true';
        } else {
            this.rateReadOnly = 'false';
        }
    }

    ratingChanged(rating:number) {
        this.request.rating = rating;
    }
    closingRemarkChanged(closingRemark:string) {
        this.request.closingRemark = closingRemark;
    }

}