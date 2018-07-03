import { Component, Provider } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

import { ImageUploaderService } from './image-uploader-service';

// @Component({
//     selector: 'create-user-page',
//     templateUrl: 'create-user-page.html',
//     providers: [ImageUploaderService]
//   })
export class CreateUserPage {

    imageURI:string;
    imageFileName:string;
    gender:string='male';
    memberTypes:{typeId:number, type:string}[] = [];
    selectedMemberTypeId:number=1;
    firstName:string;
    lastName:string;
    mobileNumber:string;

    // selectedPhoto; 
    // loading; 

    filePath:string = 'myks/profiles/'
    // imageURL:string = 'assets/imgs/man.png';
    userId:number;

    constructor(public navCtrl: NavController,private alertCtrl: AlertController,
        private storage: Storage, private imageUploader: ImageUploaderService) {
          this.memberTypes = [{typeId:1, type:'Owner'},
          {typeId:2, type:'Tanent'},
          {typeId:3, type:'Relative'}
        ]
        this.constructFilePath();
    }
    // getImage() {
    //   const options: CameraOptions = {
    //     quality: 100,
    //     targetHeight: 200,
    //     targetWidth: 200,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE,
    //     correctOrientation: true
    //   }

    //   this.camera.getPicture(options).then((imageData) => {
    //     this.loading = this.loadingCtrl.create({
    //       content: 'Please wait...'
    //     });
    //     this.loading.present();
  
    //     this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
  
    //     this.upload();
    //   }, (err) => {
    //     console.log('error', err);
    //   });
    // }

    // dataURItoBlob(dataURI) {
    //   // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    //   let binary = atob(dataURI.split(',')[1]);
    //   let array = [];
    //   for (let i = 0; i < binary.length; i++) {
    //     array.push(binary.charCodeAt(i));
    //   }
    //   return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    // };
    // upload() {
    //   if (this.selectedPhoto) {
    //     var uploadTask = firebase.storage().ref().child(this.filePath).put(this.selectedPhoto);
    //     uploadTask.then(this.onSuccess, this.onError);
    //   }
    // }
    // onSuccess = snapshot => {
    //   this.currentImage = snapshot.downloadURL;
    //   this.loading.dismiss();
    //   // alert(this.currentImage);
    // };
    
    // onError = error => {
    //   console.log("error", error);
    //   this.loading.dismiss();
    // };

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

  let user = {};
  user['firstName'] = this.firstName;
  user['lastName'] = this.lastName;
  // user['imgUrl'] = this.currentImage;
  user['gender'] = this.gender;
  user['memberType'] = this.memberTypes;
  firebase.database().ref('users/' + this)
  
}


constructFilePath() {
  this.storage.get('buildingId').then((val) => {
    this.filePath = this.filePath + val + '/';
  }).then(data => {
    this.storage.get('flat').then((val) => {
      this.filePath = this.filePath + val + '/';
    }).then(() => {
      let d = new Date();
      let n = d.getTime();
      this.filePath = this.filePath + n + '.jpg';
    }) 
  
  })
}
// downloadUrlFromFirebase() {
//   firebase.storage().ref().child(this.filePath).getDownloadURL()
//     .then(response => {
//        this.imageURL = response;
//        console.log("Pankaj ", this.imageURL);
//       }
//     )

//     .catch(error => console.log('error', error))
// }
       
}