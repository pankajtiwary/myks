import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import { PATHNAME } from '../common/models/enum';

@Injectable()
export class MemeberTypeService {

    memberTypeMasterData:{typeId:number,type:string}[];

    public memTypeMastDataSubject:Subject<{typeId:number,type:string}[]> = new Subject();

    constructor(private storage:Storage) {
        // console.log('I am insidet the constructor ');
        // this.getMemberTypeMasterData();

    }

    getMemberTypeMasterData() {
        // console.log('I am insidet the getMemberTypeMasterData ');
        if(this.memberTypeMasterData) {
           this.memTypeMastDataSubject.next(this.memberTypeMasterData);
        } else {
            this.populateItfromLocalStorage();
            // return this.memberTypeMasterData;
        } 
        // return this.memTypeMastDataSubject;

    }

    populateItfromLocalStorage() {
        // console.log('I am insidet the populateItfromLocalStorage ');

        this.storage.get('memberTypeMasterData').then((val) => {
            if(val != undefined && val != null) {
                this.memberTypeMasterData = val;
                this.memTypeMastDataSubject.next(this.memberTypeMasterData);
            } else {
                this.populateItfromRemoteStorage();
            }           
          }).catch((error) => {
              console.log('Error getting memberType from localstorage, getting it form remote storage');
              this.populateItfromRemoteStorage();
          });
    }

    populateItfromRemoteStorage() {

        // console.log('I am insidet the populateItfromRemoteStorage ');
        firebase.database().ref(PATHNAME.MEMBERTYPE).once('value').then((snapshot) =>{
            this.memberTypeMasterData = snapshot.val();
            // console.log('populateItfromRemoteStorage ', this.memberTypeMasterData);
            this.memTypeMastDataSubject.next(this.memberTypeMasterData);
        }
        ).catch(
            error => {
                console.log("Error fetching data from fire base " + error);
            }
        )
    }

}