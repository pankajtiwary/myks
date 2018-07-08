import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";

import { User } from '../common/models/user-model';
import { PATHNAME } from '../common/models/enum';
import { ToastController  } from 'ionic-angular';
import { ServiceType } from '../common/models/servicetype';

export class ServiceTypeService {

    serviceType:ServiceType[] = [];
    getServiceTypeSubject:Subject<ServiceType[]> = new Subject();
    constructor() {
        // this.serviceType = [
        //     {serviceTypeId:1,icon:"addperson",title:'Add/Modify Member'},
        //     {serviceTypeId:2,icon:"swimming",title:'Swimming Pass'},
        //     {serviceTypeId:3,icon:"electrician",title:'Electrician'},
        //     {serviceTypeId:4,icon:"plumber",title:'Plumber'},
        //     {serviceTypeId:5,icon:"housekeeping",title:'Hourse Keeping'},
        //     {serviceTypeId:6,icon:"carpenter",title:'Carpenter'}
        // ];
    }

    getIconName(serviceTypeId:number) {
        return this.serviceType[serviceTypeId -1].icon;
    }

    getTitle(serviceTypeId:number){
        return this.serviceType[serviceTypeId -1].title;
    }

    getServiceObject(serviceTypeId:number) {
        return this.serviceType[serviceTypeId -1];
    }

    getServiceType() {
        if(this.serviceType) {
            this.getServiceTypeSubject.next(this.serviceType);
        }
        let mappingPath = PATHNAME.SERVICETYPE;
        firebase.database().ref().child(mappingPath).once('value').then((snapshot) =>{
            let users:User[] = [];
            if(snapshot != undefined && snapshot.val() != undefined) {
                this.serviceType = snapshot.val();
                this.getServiceTypeSubject.next(snapshot.val())
            }else {
                console.log('snapshot is null or undefined in serviceType');
            }
        })
    }


}