import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UserDetailsPage } from '../user-details/user-details'
import { LoadingControllerService } from '../../../common/loadingcontrollerservice';
// import { MyFamilyService } from '../../../common/myfamily.service';
import { CreateUserPage } from '../create-user/create-user-page';
import { MODE, MEMBERTYPE} from '../../../common/models/enum';
import { UserService } from '../../../common/user-service';
import { User } from '../../../common/models/user-model';
// import { Storage } from '@ionic/storage';
import { LocalStorageService } from '../../../common/local-storage-service';
import { UserVO } from '../VO/user-vo';
import { MemeberTypeService } from '../../../common/member-type-service';
import { CustomLoadingController } from '../../../common/custom-loading-controller';
import { Subscription } from 'rxjs/Subscription';
import { STATUS } from '../../../common/models/enum';
@Component({
    selector: 'users-list',
    templateUrl: 'users-list.html'
  })
export class UsersListPage implements OnDestroy,OnInit {

  users:UserVO[] = [];
  rawUserFromDb:any;
  admin:boolean = false;
  buildingId:number;
  flatNumber:number;
  memberTypeMasterData:{typeId:number,type:string}[];

  memTypeMastDataSubscription: Subscription;
  getAllUsersSubscription: Subscription;
  flatLoginDetailsSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private userSvs: UserService,
    private localStrgSvc:LocalStorageService, private memTypeService:MemeberTypeService,
    private customLoadingCtrl:CustomLoadingController) {
    this.admin = this.navParams.get('admin');
    
   
  }
  ngOnInit() {
  }


  ionViewWillEnter() {

    this.memTypeMastDataSubscription = this.memTypeService.memTypeMastDataSubject.subscribe((data) => {
      
      this.memberTypeMasterData = data;
      this.localStrgSvc.getFlatLoginDetails();
    });
    this.getAllUsersSubscription = this.userSvs.getAllUsersSubject.subscribe((data)=> {
      // this.rawUserFromDb = data;
      if(data == undefined || data == null) {
        
      } else {
        this.rawUserFromDb = data;
        this.convertObjectToArray(data);
      }
      this.customLoadingCtrl.hide();
    });
    this.flatLoginDetailsSubscription = this.localStrgSvc.flatLoginDetailsSubject.subscribe((data)=> {
      this.buildingId = data.buildingId;
      this.flatNumber = data.flatNumber;
      this.getAllUsers();
    });

  }
  ionViewDidEnter() {
    this.customLoadingCtrl.show('Loading, Pls Wait ...');
    this.memTypeService.getMemberTypeMasterData();     
  }
  ionViewWillLeave() {
    this.memTypeMastDataSubscription.unsubscribe();
    this.getAllUsersSubscription.unsubscribe();
    this.flatLoginDetailsSubscription.unsubscribe();
    // console.log('I am in ionViewWillLeave ionViewWillLeave ionViewWillLeave UsersListPage');
  }
  getAllUsers() {
    this.userSvs.getAllUsers(this.buildingId,this.flatNumber);
  }   
  userTapped(user) {
    if(this.admin === true) {
      let userModel:User = this.rawUserFromDb[user.key];
      this.navCtrl.push(CreateUserPage, {user:userModel, key:user.key, mode:MODE.EDIT});
    } else {
      this.navCtrl.push(UserDetailsPage, {user:user});
    }
  }

  getIconName(status:string) {
    if(status === STATUS.EXPIRED) {
      return "thumbs-down";
    }else if(status === STATUS.ABOUTTOEXPIRE) {
      return "alert";
    } else {
      return "thumbs-up";
    }
  }
  getColorName(status) {
    if(status === STATUS.EXPIRED) {
      return "danger";
    }else if(status === STATUS.ABOUTTOEXPIRE) {
      return "warn";
    } else {
      return "secondary";
    }

  }

  addNewMember() {
    this.navCtrl.push(CreateUserPage, {'mode' : MODE.CREATE});
  }

  private convertObjectToArray(data) {
    let usersTemp:UserVO[] = [];
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
          let type:string; //= EnumsUtility.parseMemberType(data['memberTypeId']);
          for(let i=0;i<this.memberTypeMasterData.length;i++) {
            let memberType = this.memberTypeMasterData[i];
            // console.log('XXXXXXXXXXXXXXXX ', memberType , data[property]['memberTypeId']);
            if(memberType.typeId == data[property]['memberTypeId']) {
              type=memberType.type;
              break;
            }
            
          }
          let status:string = this.getStatus(data[property]);
          let userVO:UserVO = {...data[property],status:status, key:property, type:type};
          // console.log(data[property]);
          usersTemp.push(userVO);
      }
    }
    this.users = usersTemp;
    
  }

  ngOnDestroy() {
    // this.memTypeMastDataSubscription.unsubscribe();
    // this.getAllUsersSubscription.unsubscribe();
    // this.flatLoginDetailsSubscription.unsubscribe();

  }

  getStatus(user:User) : string {
    if(user.subscriptions) {
        return this.getDays(user.subscriptions.swimming.startDate, user.subscriptions.swimming.endDate);
    } else {
      return 'expired';
    }
  }

  private getDays(startDate:number, endDate:number):string {
      let currentDate = new Date().getTime();
      if(currentDate >= endDate) {
        return 'expired';
      }
      let days = Math.ceil((endDate-currentDate)/(1000*3600*24));
      if(days <=7) {
        return 'aboutToExpired';
      } else {
        return 'live';
      }
  }

 

}