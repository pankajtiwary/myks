import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { MyFamilyService } from '../../../common/myfamily.service';

@Component({
    selector: 'request-page',
    templateUrl: 'request-page.html'
  })
export class RequestPage {

    service:string;
    serviceid:number;
    userId:number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private myFamily:MyFamilyService) {
        let service_ = this.navParams.get('service');
        if(service_ === 'electrician') {
            this.service = "Electrician";
        } else if (service_ === 'plumber') {
            this.service = "Plumber";
        } else if (service_ ==='housekeeping') {
            this.service ="Hourse Keeping";
        }
    }

    getUserList() {
        let userList:any[] = [];
        for(let i=0;i<this.myFamily.getMyFamilyData().length; i++) {
            let user ={};
            user['userId'] = this.myFamily.getMyFamilyData()[i].userId;
            user['name'] = this.myFamily.getMyFamilyData()[i].firstName + " " 
            + this.myFamily.getMyFamilyData()[i].lastName
            userList.push(user);            
        }
        return userList;
    }



}