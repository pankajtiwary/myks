import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {ApartmentDataService} from '../../common/apartdata.service';
// import {UsersListPage} from '../../pages/users/users-list/users-list';
import {ServicePage} from '../../pages/service-page/service-page';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import {LoadingControllerService} from '../../common/loadingcontrollerservice';
@Component({
  selector: 'myflat-page',
  templateUrl: 'myflat-page.html'
})
export class MyFlatPage {

 
  pin:string;
  buildings:String[] = [];
  buildingId:number;
  floorPlans:any[];
  flats:any[];
  flat:number;
  floor:number;
  constructor(private apartmentDataService:ApartmentDataService,public navCtrl: NavController, 
    public navParams: NavParams, private alertCtrl: AlertController, private storage: Storage) {
    this.floorPlans = apartmentDataService.getFloorPlan();
    storage.get('pin').then((val) => {
      this.pin = val;
    });
    storage.get('floor').then((val) => {
      this.floor = val;
      this.onChangeFloor(this.floor);
    });
    storage.get('flat').then((val) => {
      this.flat = val;
    });    

    storage.get('buildingId').then((val) => {
      this.buildingId = val;
    });            
  }

  getApartmentData() {
    return this.apartmentDataService.getApartment();
  }

  onChangeFloor(floor:number) {
    for(let i=0;i<this.floorPlans.length; i++) {
       if(this.floorPlans[i].floorId == floor) {
         this.flats = [...this.floorPlans[i].flats];
       }
    }
    this.flat = undefined;
  }
  onSubmit() {
     if(this.validate() === false) {
      //  console.log("I am going here");
        return;
     }
    //  this.loadingCtr.show();
     this.storage.set("flat", this.flat);
     this.storage.set("buildingId", this.buildingId);
     this.storage.set("floor", this.floor);
     this.storage.set("pin", this.pin);
     this.navCtrl.push(ServicePage);
    // this.nav.setRoot(UsersListPage);
  }

  validate() {
    // console.log(this.flat, this.floor);
    if(this.buildingId == undefined) {
      let alert = this.alertCtrl.create({
        title: 'No Building Selected',
        message: 'Please Select Building',
        buttons: ['OK']
      });
      // console.log("I am here");
      alert.present();
      return false;
    }

    if(this.floor == undefined) {
      let alert = this.alertCtrl.create({
        title: 'No Floor Selected',
        message: 'Please Select Floor',
        buttons: ['OK']
      });
      // console.log("I am here");
      alert.present();
      return false;
    }   
    if(this.flat == undefined) {
      let alert = this.alertCtrl.create({
        title: 'No Flat Selected',
        message: 'Please Select Flat',
        buttons: ['OK']
      });
      // console.log("I am here");
      alert.present();
      return false;
    }    
    if(this.pin == "" || this.pin == undefined) {
      let alert = this.alertCtrl.create({
        title: 'No PIN',
        message: 'Please Enter PIN',
        buttons: ['OK']
      });
      // console.log("I am here");
      alert.present();
      return false;
    }
  }
}