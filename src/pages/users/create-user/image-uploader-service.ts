import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";


@Injectable()
export class ImageUploaderService {

    loading;
    selectedPhoto;
    currentImage;
    filePath;

    public imageUploaderSubject:Subject<string> = new Subject();

    constructor(private camera: Camera,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,private alertCtrl: AlertController,
        ) {

    }

    getImage(filePath_) {
        this.filePath = filePath_;

        const options: CameraOptions = {
            quality: 100,
            targetHeight: 200,
            targetWidth: 200,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
          }
    
          this.camera.getPicture(options).then((imageData) => {
            this.loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            this.loading.present();
      
            this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      
            this.upload();
          }, (err) => {
            console.log('error', err);
          });
    }
    dataURItoBlob(dataURI) {
        // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
      };
      upload() {
        if (this.selectedPhoto) {
          var uploadTask = firebase.storage().ref().child(this.filePath).put(this.selectedPhoto);
          uploadTask.then(this.onSuccess, this.onError);
        }
      }
      onSuccess = snapshot => {
        this.currentImage = snapshot.downloadURL;
        this.loading.dismiss();
        this.showMessage('Image Uploaded Successfully', 3000);
        this.imageUploaderSubject.next(this.currentImage);
        // alert(this.currentImage);
      };
      
      onError = error => {
        console.log("error", error);
        this.loading.dismiss();
      };  

      showMessage(msg:string, duration:number) {
        const toast = this.toastCtrl.create({
          message: msg,
          duration: duration
        });
        toast.present();
      }      
      
}