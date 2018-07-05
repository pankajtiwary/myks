import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {ApartmentDataService} from '../../common/apartdata.service';
import {UsersListPage} from '../../pages/users/users-list/users-list';
import {ServicePage} from '../../pages/service-page/service-page';
import { AlertController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
// import { POINTER_EVENT_TYPE_MOUSE } from 'ionic-angular/umd/gestures/pointer-events';
// import {LoadingControllerService} from '../../common/loadingcontrollerservice';
import { LocalStorageService } from '../../common/local-storage-service';
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
  admin:boolean = false;
  pwdiconname:string = 'md-eye-off';
  pwdfieldtype:string='password';
  constructor(private apartmentDataService:ApartmentDataService,private navCtrl: NavController, 
    public navParams: NavParams, private alertCtrl: AlertController, private localeStorage: LocalStorageService
    ) {

        this.admin = this.navParams.get('admin');

        this.floorPlans = apartmentDataService.getFloorPlan();

        localeStorage.flatLoginDetailsSubject.subscribe(data=>{
          if(data != undefined && data != null) {
            this.pin   = data.PIN;
            this.floor = data.floor;
            
            this.buildingId = data.buildingId;
            this.onChangeFloor(this.floor);
            this.flat  = data.flatNumber;
          }

        })
        localeStorage.getFlatLoginDetails();
        // storage.get('pin').then((val) => {
        //   this.pin = val;
        // });
        // storage.get('floor').then((val) => {
        //   this.floor = val;
        //   this.onChangeFloor(this.floor);
        // });
        // storage.get('flat').then((val) => {
        //   this.flat = val;
        // });    

        // storage.get('buildingId').then((val) => {
        //   this.buildingId = val;
        // });            
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

     this.saveDetailsInStorage();
     this.navCtrl.push(ServicePage);
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

  changePIN() {

  }
  updateMember() {
    this.saveDetailsInStorage();
    this.navCtrl.push(UsersListPage, {admin:true});
  }

  togglePassword() {
    console.log("I am inside the togglePassword")
    if (this.pwdfieldtype === 'password') {
      this.pwdfieldtype = 'input';
      this.pwdiconname ='md-eye';
    } else {
      this.pwdfieldtype = 'password';
      this.pwdiconname ='md-eye-off';
    }
  }

  saveDetailsInStorage() {
    // this.storage.set("flat", this.flat);
    // this.storage.set("buildingId", this.buildingId);
    // this.storage.set("floor", this.floor);
    // this.storage.set("pin", this.pin);
    this.localeStorage.saveFlatLoginDetails(this.buildingId, this.floor, this.flat, this.pin);
  }
}