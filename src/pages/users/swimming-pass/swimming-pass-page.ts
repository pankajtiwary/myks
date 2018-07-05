import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UserVO } from '../VO/user-vo';
import { User } from '../../../common/models/user-model';
import { UserService } from '../../../common/user-service';
import { CreateUserPage } from '../create-user/create-user-page';

@Component({
    selector: 'swimming-pass-page',
    templateUrl: 'swimming-pass-page.html'
  })
export class SwimmingPassPage {
 
  user:User;
  key:string;
  buidlingId:number;
  flatNumber:number;
  startDate:string;
  endDate:string;
  parentPage:CreateUserPage;
  constructor(private navParam:NavParams, private userSvc:UserService, private navCtrl:NavController) {
    this.user = this.navParam.get('user');
    this.key = this.navParam.get('key');
    this.buidlingId = this.navParam.get('buildingId');
    this.flatNumber = this.navParam.get('flatNumber');
    this.parentPage = this.navParam.get('parentPage');
    if(this.user.subscriptions) {
      this.startDate = new Date(this.user.subscriptions.swimming.startDate).toISOString();
      this.endDate = new Date(this.user.subscriptions.swimming.endDate).toISOString();
      // alert(this.startDate +" XXXX " +  this.endDate);
    }

  }

  updateSubscription() {
    let tempStartDate = new Date(this.startDate);
    let tempEndDate = new Date(this.endDate);

    let tempUser:User = {
      ...this.user, 
      subscriptions:{
        swimming: {
          startDate:tempStartDate.getTime(),
          endDate:tempEndDate.getTime()
        }
      }
    };
    this.userSvc.updateUser(tempUser, this.key,this.buidlingId,this.flatNumber );
    this.parentPage.user = tempUser;
    this.navCtrl.pop();

  }

}