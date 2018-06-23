import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'user-details',
    templateUrl: 'user-details.html'
  })
export class UserDetailsPage {

    user:any;
    iconname:string;
    color:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
        console.log(this.user);
        if(this.user.status === "expired") {
            this.iconname="thumbs-down";
            this.color="danger";
        } else if (this.user.status === "aboutToExpired") {
            this.iconname="alert";
            this.color="warn";
        } else {
            this.iconname="thumbs-up";
            this.color="secondary";
        }
    }
}