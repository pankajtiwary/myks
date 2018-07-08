import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
// import { MyFamilyService } from '../../../common/myfamily.service';
import { AlertController } from 'ionic-angular';
import {RequestSubmittedPage} from './request-submitted-page/request-submitted-page';
import { MODE,SERVICESTATUS } from '../../../common/models/enum';
import { Service } from '../../../common/models/service-model';
import { UserService } from '../../../common/user-service';
import { ManageServices } from '../../../common/manage-services';
import { ServiceTypeService } from '../../../common/service-type-service';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../../../common/local-storage-service';
import { ServiceType } from '../../../common/models/servicetype';

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
    mode:MODE;
    serviceModel:Service;
    userList:any[] = [];
    serviceType:ServiceType = {
        icon:undefined,
        serviceTypeId:undefined,
        title:undefined
    }

    getUserSubscription:Subscription;
    getServicyTypeSubscription:Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        private alertCtrl:AlertController, private manageSvc:ManageServices,
        private userSvc:UserService, private localStorageSvc: LocalStorageService,
        private svcTypeSvc:ServiceTypeService) {
        let service_ = this.navParams.get('serviceType');
        this.image =service_;
        if(service_ === 'electrician') {
            this.service = "Electrician";
        } else if (service_ === 'plumber') {
            this.service = "Plumber";
        } else if (service_ ==='housekeeping') {
            this.service ="Hourse Keeping";
        }
        this.initializeService();
    }

    ionViewWillEnter() {
        let flatDetail = this.localStorageSvc.getDirectFlatLoginDetails();
        this.getUserSubscription = this.userSvc.getAllUsersSubject.subscribe(snapshot => {
            
            for (var property in snapshot) {
                let user ={};
                if (snapshot.hasOwnProperty(property) && snapshot[property].active === true) {
                    user['userId'] = property;
                    user['name'] = snapshot[property].firstName + ' ' + snapshot[property].lastName;
                    this.userList.push(user);
                }
            }
        });

        this.getServicyTypeSubscription = this.svcTypeSvc.getServiceTypeSubject.subscribe(data=>{
            let service_ = +this.navParams.get('serviceType');
            for(let i=0;data.length;i++) {
                if(service_ === data[i].serviceTypeId) {
                    this.serviceType = data[i];
                    break;
                }
            }
        });
    }

    ionViewWillLeave() {
        this.getUserSubscription.unsubscribe();
        this.getServicyTypeSubscription.unsubscribe();
    }
    ionViewDidEnter() {
        let data:any = this.localStorageSvc.getDirectFlatLoginDetails();
        this.userSvc.getAllUsers(data.buildingId, data.flatNumber);
        this.svcTypeSvc.getServiceType();
    }


    onSubmit() {
        if(this.validInput() === false) {
            return;
        }
        let data:any = this.localStorageSvc.getDirectFlatLoginDetails();
        let tempServiceModel:Service = {
            ...this.serviceModel, creationDate: new Date().getTime(), 
            serviceType:this.serviceType.serviceTypeId, serviceStatus:SERVICESTATUS.OPEN
        }
        this.manageSvc.createService(tempServiceModel,data.buildingId, data.flatNumber);
        this.navCtrl.setRoot(RequestSubmittedPage);
        // this.navCtrl.push(RequestSubmittedPage);

    }

    validInput() {
        if(this.serviceModel.contactPerson == undefined || this.serviceModel.subject == undefined
             || this.serviceModel.description == undefined) {
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

    initializeService() {
        this.serviceModel = {
            contactPerson:undefined,
            creationDate:undefined,
            description:undefined,
            serviceType:undefined,
            subject:undefined,
            serviceStatus:undefined
        }
    }



}