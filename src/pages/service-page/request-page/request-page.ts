import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { MyFamilyService } from '../../../common/myfamily.service';
import { AlertController } from 'ionic-angular';
import {RequestSubmittedPage} from './request-submitted-page/request-submitted-page';

@Component({
    selector: 'request-page',
    templateUrl: 'request-page.html'
  })
export class RequestPage {

    service:string;
    serviceid:number;
    userId:number;
    image:string;
    subject:string;
    description:string;


    constructor(public navCtrl: NavController, public navParams: NavParams, 
        private myFamily:MyFamilyService, private alertCtrl:AlertController) {
        let service_ = this.navParams.get('service');
        this.image =service_;
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

    onSubmit() {
        if(this.validInput() === false) {
            return;
        }
        this.navCtrl.setRoot(RequestSubmittedPage);
        // this.navCtrl.push(RequestSubmittedPage);

    }

    validInput() {
        if(this.userId == undefined || this.subject == undefined || this.description == undefined) {
            let alert = this.alertCtrl.create({
                title: 'Required Field',
                message: 'Subject, Description and Requester are mandatory field',
                buttons: ['OK']
              });
              // console.log("I am here");
              alert.present();
              return false;
        }
        return true;
   
    }



}