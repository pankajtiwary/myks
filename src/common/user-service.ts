import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { User } from '../common/models/user-model';
import { PATHNAME } from '../common/models/enum';
import { ToastController  } from 'ionic-angular';


@Injectable()
export class UserService {


    public createUserSubject:Subject<number> = new Subject();

    constructor(private storage:Storage, private toastCtrl : ToastController) {

    }

    createUser(user:User, buildingId:number, flatNumber:number) :string {
        let currentDate = new Date().getTime();
        try {
            let userRef = firebase.database().ref(PATHNAME.PROFILES + '/').push(user);
            let mappingPath = PATHNAME.FLATOWNERMAPPING + '/' + buildingId + '/' + flatNumber;
            let mapingRef = firebase.database().ref(mappingPath).set(userRef.key);
            this.showMessage('User Created Successfully', 3000);
            return userRef.key;
    
        } catch(e) {
            alert(e);
        }
    }
    updateUser(user:User, key:string) {
        try {
            firebase.database().ref().child(PATHNAME.PROFILES + '/' + key)
            .update(user);
            this.showMessage('User Updated Successfully', 3000);
        }
        catch(e) {
            alert(e);
        }
    }
    getUser(userId:number) {

    }
    deleteUser(userId:number) {

    }

    showMessage(msg:string, duration:number) {
        const toast = this.toastCtrl.create({
          message: msg,
          duration: duration
        });
        toast.present();
      }
}