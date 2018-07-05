import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { APPCONST } from '../common/models/enum';
@Injectable()
export class LocalStorageService {

    flatLoginDetails:{buildingId:number, floor:number ,flatNumber:number, PIN:string};

    public flatLoginDetailsSubject:Subject<{buildingId:number, floor:number ,
        flatNumber:number, PIN:string}> = new Subject();

    constructor(private storage:Storage) {
        
    }

    getFlatLoginDetails() {
        if(this.flatLoginDetails) {
            this.flatLoginDetailsSubject.next(this.flatLoginDetails);
        } else {
            this.constructFlatLoginDetails();
        }
    }

    saveFlatLoginDetails(buildingId:number, floor:number, flatNumber:number, PIN:string) {
        if( this.flatLoginDetails == undefined || this.flatLoginDetails == null) {
            this.flatLoginDetails = {flatNumber:0, buildingId:0,floor:0, PIN:''};
        }
        this.flatLoginDetails.buildingId = buildingId;
        this.flatLoginDetails.flatNumber = flatNumber;
        this.flatLoginDetails.PIN = PIN;
        this.flatLoginDetails.floor = floor;
        // console.log('XXXXXXXXXXXXXxx ', this.flatLoginDetails);
        this.storage.set(APPCONST.FLATLOGINDETAILS, this.flatLoginDetails);
    }

    private constructFlatLoginDetails() {
        this.storage.get(APPCONST.FLATLOGINDETAILS).then((val) => {
          this.flatLoginDetails = val;
          this.flatLoginDetailsSubject.next(this.flatLoginDetails);
        })
    }  

}