import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class CustomLoadingController {

    loading:any;

    constructor(private loadingCtrl : LoadingController) {

    }

    show(msg:string) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });
        this.loading.present();
    }
    hide() {
        this.loading.dismiss();
    }

 
}