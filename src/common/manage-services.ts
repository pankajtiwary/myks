import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import { PATHNAME } from '../common/models/enum';
import { Service } from '../common/models/service-model';
import { ToastController  } from 'ionic-angular';


@Injectable()
export class ManageServices {

    getServiceSubject:Subject<Service[]> = new Subject();

    constructor(private toastCtrl : ToastController) {
        
    }

    createService(service:Service, buildingId:number, flatNumber:number) {
        let mappingPath = PATHNAME.SERVICES + '/' + buildingId + '/' + flatNumber;
        try {
            let serviceRef = firebase.database().ref(mappingPath).push(service);
            this.showMessage('Request Raised Successfully ', 3000);
            return serviceRef.key;
    
        } catch(e) {
            alert(e);
        }
    }

    getServices(buildingId:number, flatNumber:number) {
        let mappingPath = PATHNAME.SERVICES + '/' + buildingId + '/' + flatNumber;
        firebase.database().ref().child(mappingPath).once('value').then((snapshot) =>{
            let services:Service[] = [];
            if(snapshot != undefined && snapshot.val() != undefined) {
                this.getServiceSubject.next(snapshot.val())
            }else {
                console.log('snapshot is null or undefined');
            }
        })
    }
    showMessage(msg:string, duration:number) {
        const toast = this.toastCtrl.create({
          message: msg,
          duration: duration
        });
        toast.present();
      }    
}