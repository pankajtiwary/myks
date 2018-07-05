import { Component } from '@angular/core';
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
@Component({
    selector: 'users-list',
    templateUrl: 'users-list.html'
  })
export class UsersListPage {

  users:UserVO[] = [];
  rawUserFromDb:any;
  admin:boolean = false;
  buildingId:number;
  flatNumber:number;
  memberTypeMasterData:{typeId:number,type:string}[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private loadingCrt:LoadingControllerService, private userSvs: UserService,
    private localStrgSvc:LocalStorageService, private memTypeService:MemeberTypeService,
    private customLoadingController:CustomLoadingController) {
    this.admin = this.navParams.get('admin');
    
    memTypeService.memTypeMastDataSubject.subscribe((data) => {
      // customLoadingController.show('Please Wait ....');
      // console.log('memTypeMastDataSubject ', data);
      this.memberTypeMasterData = data;
      localStrgSvc.getFlatLoginDetails();
    });
    userSvs.getAllUsersSubject.subscribe((data)=> {
      this.rawUserFromDb = data;
      this.convertObjectToArray(data);
      // customLoadingController.hide();
    });
    localStrgSvc.flatLoginDetailsSubject.subscribe((data)=> {
      this.buildingId = data.buildingId;
      this.flatNumber = data.flatNumber;
      this.getAllUsers();
    });
    memTypeService.getMemberTypeMasterData();

    
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
    if(status === "expired") {
      return "thumbs-down";
    }else if(status === "aboutToExpired") {
      return "alert";
    } else {
      return "thumbs-up";
    }
  }
  getColorName(status) {
    if(status === "expired") {
      return "danger";
    }else if(status === "aboutToExpired") {
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
          for(let memberType of this.memberTypeMasterData) {
            if(memberType.typeId === data[property]['memberTypeId']) {
              type=memberType.type;
            }
            break;
          }
          let userVO:UserVO = {...data[property],status:'expired', key:property, type:type};
          // console.log(data[property]);
          usersTemp.push(userVO);
      }
    }
    this.users = usersTemp;
  }

}