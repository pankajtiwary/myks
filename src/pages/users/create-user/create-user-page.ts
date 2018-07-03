import { Component, Provider,OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ImageUploaderService } from './image-uploader-service';
import { User } from '../../../common/models/user-model';
import { GENDER,MEMBERTYPE,MODE } from '../../../common/models/enum';
import { UserService } from '../../../common/user-service';
import { MemeberTypeService } from '../../../common/member-type-service';

@Component({
    selector: 'create-user-page',
    templateUrl: 'create-user-page.html',
    providers: [ImageUploaderService]
  })
export class CreateUserPage implements OnDestroy {

    memberTypes:{typeId:number, type:string}[] = [];
    mode:MODE;
    key:string;
    user:User;
    buildingId:number;
    flatNumber:number;

    filePath:string;
    currentImage:string = 'assets/imgs/man.png';

    constructor(public navCtrl: NavController,private alertCtrl: AlertController,
        private storage: Storage, private imageUploader: ImageUploaderService,
        private userService:UserService, private navParam: NavParams, 
        private memTypeSvc:MemeberTypeService, private toastCtrl: ToastController ) {
          this.memTypeSvc.memTypeMastDataSubject.subscribe(data =>{
            this.memberTypes = data;
          });
          this.memTypeSvc.getMemberTypeMasterData();
        this.mode = this.navParam.get(MODE.MODE);
        if(this.mode === MODE.CREATE) {
            this.initializeUser();
        } else if(this.mode === MODE.EDIT) {
          this.user = this.navParam.get('user');
          this.key = this.navParam.get('key');
        }
        this.imageUploader.imageUploaderSubject.subscribe((url) => {
          this.user.downloadbleUrl = url;
          this.user.imageLoc=this.filePath;
          this.userService.updateUser(this.user, this.key);
        });    
        //this is just populate the buildingId and flatNumber, required for creating user
        this.constructFilePath();    
    }


      showAlert() {
        const alert = this.alertCtrl.create({
          title: 'Misssing Field',
          subTitle: 'First Name & Last Name are mandatory!',
          buttons: ['OK']

        });
        alert.present();
      }

saveUser() {
    if(this.user.firstName == undefined || this.user.lastName == undefined) {
        //this.showAlert();
        this.showMessage('Firt Name & Second Name are mandatory', 3000);
        return;
    }
    if( this.mode === MODE.CREATE) {
      let date:number = new Date().getTime();
      this.user.createdDate = date;
      this.key = this.userService.createUser(this.user, this.buildingId, this.flatNumber);
      this.mode = MODE.EDIT;
    } else {
      this.userService.updateUser(this.user, this.key);
      this.mode = MODE.EDIT;
    }
  
}



  getImage() {
    if(this.mode === MODE.CREATE) {
      this.showMessage('Please Submit the above form first', 3000);
      return;
    }
    this.constructFilePath();
  }

  constructFilePath() {
    this.storage.get('buildingId').then((val) => {
      this.buildingId = val;
      this.filePath = 'myks/profiles/' + val + '/';
    }).then(data => {
      this.storage.get('flat').then((val) => {
        this.flatNumber = val;
        this.filePath = this.filePath + val + '/';
      }).then(() => {
        this.filePath = this.filePath + this.key + '.jpg';
        this.imageUploader.getImage(this.filePath);
      }) 
    
    })
  }     
  
  initializeUser() {
    this.user = {
      firstName:undefined,
      lastName:undefined,
      active:true,
      createdDate:undefined,
      gender:GENDER.MALE,
      memberTypeId:MEMBERTYPE.OWNER,
      mobileNumber:undefined,
      downloadbleUrl:'assets/imgs/man.png'
    }
  }

  ngOnDestroy(){
    this.imageUploader.imageUploaderSubject.unsubscribe();

  }  

  showMessage(msg:string, duration:number) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }
}