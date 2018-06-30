import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServiceType} from '../../../common/service-type-service';

@Component({
    selector: 'request-breakdown-page',
    templateUrl: 'request-breakdown-page.html'
  })
  export class RequestBreakdownPage  {

    worklists:{bldgId:number, bldgName:string, pendingRequest:number, icon:string }[] = [];
    service:any;
    constructor( private navCtrl:NavController, private navParam:NavParams,
    private serviceType:ServiceType) {
        let serviceTypeId = +this.navParam.get('serviceTypeId');
        this.service = this.serviceType.getServiceObject(serviceTypeId);
        this.worklists = [{bldgId:1, bldgName:'Aster', pendingRequest:1, icon:'aster'},
                                 {bldgId:2, bldgName:'Cosmos', pendingRequest:1, icon:'cosmos'},
                                 {bldgId:3, bldgName:'Daffodil', pendingRequest:1, icon:'daffodil'},
                                 {bldgId:4, bldgName:'Lotus', pendingRequest:1, icon:'lotus'},
                                 {bldgId:5, bldgName:'Tulip', pendingRequest:1, icon:'tulip'},
                                 {bldgId:20, bldgName:'Total Request', pendingRequest:5, icon:'myallrequest'},
                                ];
    }

    itemTapped() {

    }

  }