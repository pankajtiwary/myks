import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

// @Component({
//     selector: 'create-user-page',
//     templateUrl: 'create-user-page.html'
//   })
export class CreateUserPage {

    imageURI:string;
    imageFileName:string;
    gender:string='male';
    memberTypes:{typeId:number, type:string}[] = [];
    selectedMemberTypeId:number=1;
    firstName:string;
    lastName:string;

    constructor(public navCtrl: NavController,
        private transfer: FileTransfer,private camera: Camera,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,private alertCtrl: AlertController) {
          this.memberTypes = [{typeId:1, type:'Owner'},
          {typeId:2, type:'Tanent'},
          {typeId:3, type:'Relative'}
        ]
        
    }
    getImage() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = imageData;
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }
      uploadFile() {
        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
      
        let options: FileUploadOptions = {
          fileKey: 'ionicfile',
          fileName: 'ionicfile',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
      
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
          .then((data) => {
          console.log(data+" Uploaded Successfully");
          this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
          loader.dismiss();
          this.presentToast("Image uploaded successfully");
        }, (err) => {
          console.log(err);
          loader.dismiss();
          this.presentToast(err);
        });
      }
      presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
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
        if(this.firstName == undefined || this.lastName == undefined) {
           this.showAlert();
           return;
        }
      }
       
}