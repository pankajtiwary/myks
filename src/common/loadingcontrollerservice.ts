import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingControllerService {

    loader:any;
    constructor(private loadingCtr: LoadingController) {

        this.loader = this.loadingCtr.create({
            content: 'Getting latest entries...',
          });
    }

    show() {
        this.loader.present();
    }

    hide() {
        this.loader.dismiss();
    }

}