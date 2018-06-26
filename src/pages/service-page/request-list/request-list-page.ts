import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {RequestDetailPage} from './request-detail-page/request-detail-page';

@Component({
    selector: 'request-list-page',
    templateUrl: 'request-list-page.html'
  })
export class RequestListPage {

    myrequestlist:any[]

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.myrequestlist = [
            {requestId:1, raisedByUserId:1, requestType:'electrician', subject:'Tubelight not working', 
            description: 'Tubelight of my apartment is not working, pls check', status: 'open', 
            creationDate:'20-Jun-2018', resolvedDate:null, closingRemark:null },
            {requestId:3, raisedByUserId:1, requestType:'electrician', subject:'Replacement of bell', 
            description: 'My Bell is not working and I need to replace it with new one, can any one help', 
            status: 'done', creationDate:'20-Jun-2018',resolvedDate:'01-Jul-2018', closingRemark:'Resolved'  },
            {requestId:4, raisedByUserId:1, requestType:'plumber', subject:'Leakage in Bedroom', 
            description: 'Due to heavy rains, there is leakage in my bedroom which needs to be fixed', 
            status: 'open', creationDate:'20-Jun-2018', resolvedDate:null, closingRemark:null },
            {requestId:5, raisedByUserId:1, requestType:'plumber', subject:'Leakage in main pipe', 
            description: 'There is leakage in main pipe of lotus building and needs to be fixed.', 
            status: 'done', creationDate:'20-Jun-2018',resolvedDate:'01-Jul-2018', closingRemark:'Resolved' },
        ]

    }

    goToRequestDetailPage(request:any) {
        this.navCtrl.push(RequestDetailPage, {request:request});
    }

}