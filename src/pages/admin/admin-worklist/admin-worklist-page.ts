import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { MyFlatPage } from '../../myflat-page/myflat-page';
import { RequestBreakdownPage } from '../request-breakdown-page/request-breakdown-page';
import {ServiceTypeService} from '../../../common/service-type-service';

@Component({
    selector: 'admin-worklist-page',
    templateUrl: 'admin-worklist-page.html'
  })
  export class AdminWorklistPage  {
    worklists:any[] = [];
    constructor(private navCtrl: NavController, private navParams: NavParams,
    private serviceType: ServiceTypeService) {
        this.worklists = [
            {id:1,icon:"addperson",title:'Add/Modify Member', pendingRequest:6},
            {id:2,icon:"swimming",title:'Swimming Pass', pendingRequest:6},
            {id:3,icon:"electrician",title:'Electrician Request', pendingRequest:6},
            {id:4,icon:"plumber",title:'Plumber Request', pendingRequest:6},
            {id:5,icon:"housekeeping",title:'Hourse Keeping Request', pendingRequest:6},
            {id:6,icon:"carpenter",title:'Carpenter Request', pendingRequest:6},
            {id:20,icon:"myallrequest",title:'Total Pending Request', pendingRequest:30}
        ];
    }

    itemTapped(workitem:{id:number, icon:string, title:string}) {
        switch(workitem.id) {
            case 1:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 2:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 20:
                // this.navCtrl.push(MyFlatPage, {admin:true});
                break;                
            default:
                this.navCtrl.push(RequestBreakdownPage, {serviceTypeId:workitem.id});
                break;                             
        } 

    }

  }