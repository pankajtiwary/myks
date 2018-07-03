import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {RequestDetailPage} from './request-detail-page/request-detail-page';
import { ModalController } from 'ionic-angular';
import {RequestFilterPage} from '../request-filter-page/request-filter-page';

@Component({
    selector: 'request-list-page',
    templateUrl: 'request-list-page.html'
  })
export class RequestListPage {

    myrequestlist:any[]

    constructor(private navCtrl: NavController, private navParams: NavParams,
    private modelCtrl: ModalController) {
        this.myrequestlist = [
            {requestId:1, raisedByUserId:1, requestType:'electrician', subject:'Tubelight not working', 
            description: 'Tubelight of my apartment is not working, pls check', status: 'open', 
            creationDate:'20-Jun-2018', resolvedDate:null, rating:0,closingRemark:null },
            {requestId:3, raisedByUserId:1, requestType:'electrician', subject:'Replacement of bell', 
            description: 'My Bell is not working and I need to replace it with new one, can any one help', 
            status: 'done', creationDate:'20-Jun-2018',resolvedDate:'01-Jul-2018', rating:2,closingRemark:'Resolved'  },
            {requestId:4, raisedByUserId:1, requestType:'plumber', subject:'Leakage in Bedroom', 
            description: 'Due to heavy rains, there is leakage in my bedroom which needs to be fixed', 
            status: 'open', creationDate:'20-Jun-2018', resolvedDate:null, rating:0,closingRemark:null },
            {requestId:5, raisedByUserId:1, requestType:'plumber', subject:'Leakage in main pipe', 
            description: 'There is leakage in main pipe of lotus building and needs to be fixed.', 
            status: 'done', creationDate:'20-Jun-2018',resolvedDate:'01-Jul-2018',rating:5 ,closingRemark:'Resolved' },
        ]

    }

    goToRequestDetailPage(request:any) {
        this.navCtrl.push(RequestDetailPage, {request:request});
    }
    filterRequest() {
        
    }

}