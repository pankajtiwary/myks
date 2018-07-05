import { Component,OnDestroy } from '@angular/core';
import { ApartmentDataService } from '../../common/apartdata.service';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { MemeberTypeService } from '../../common/member-type-service';
import { User } from '../../common/models/user-model';
import { GENDER,MEMBERTYPE,PATHNAME } from '../../common/models/enum';
import { UserService } from '../../common/user-service';
import { SubscriptionType } from '../../common/models/subscriptionType';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnDestroy {

  file: File;
  someTextUrl;
  // filePath:string = 'myks/profiles/';

  floorPlan = [
    {floorId:1,floorName:'First',  flats:[101,102,103,104]},
    {floorId:2,floorName:'Second', flats:[201,202,203,204]},
    {floorId:3,floorName:'Third',  flats:[301,302,303,304]},
    {floorId:4,floorName:'Fourth', flats:[401,402,403,404]},
    {floorId:5,floorName:'Fifth',  flats:[501,502,503,504]},
    {floorId:6,floorName:'Sixth',  flats:[601,602,603,604]},
    {floorId:7,floorName:'Seventh',flats:[701,702,703,704]}
];
apartment = [
    {id: 1, name:"Aster",   icon:'aster',    floors:[...this.floorPlan]},
    {id: 2, name:"Cosmos",  icon:'cosmos',   floors:[...this.floorPlan]},
    {id: 3, name:"Daffodil",icon:'daffodil', floors:[...this.floorPlan]},
    {id: 4, name:"Lotus",   icon:'lotus',    floors:[...this.floorPlan]},
    {id: 5, name:"Tulip",   icon:'tulip',    floors:[...this.floorPlan]},
];

serviceType:{serviceTypeId:number,      title:string,icon:string }[] =  [
  {serviceTypeId:1,icon:"addperson",    title:'Add/Modify Member'},
  {serviceTypeId:2,icon:"swimming",     title:'Swimming Pass'},
  {serviceTypeId:3,icon:"electrician",  title:'Electrician'},
  {serviceTypeId:4,icon:"plumber",      title:'Plumber'},
  {serviceTypeId:5,icon:"housekeeping", title:'Hourse Keeping'},
  {serviceTypeId:6,icon:"carpenter",    title:'Carpenter'}
];


  constructor(private storage: Storage, private memberTypeService:MemeberTypeService,
  private userSvc:UserService ) {

  // let  playersRef = firebase.database().ref('players');
  //  playersRef.on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //   }, function(error) {
  //     console.log("Error: ", error);
  //   })
  this.memberTypeService.memTypeMastDataSubject.subscribe((data) =>{
    console.log(' I am inside the printMemberType of subcribe method ', data );
  });
    //  this.constructFilePath();
  }

  createApartmentData() {
     let object = this.apartment;
     let  playersRef = firebase.database().ref(PATHNAME.APARTMENT);
     console.log(playersRef);
     playersRef.set(object).catch(error => {
      console.log(error);
     });
  }

  createServiceTypeMasterData() {
    let object = this.serviceType;
    let  serviceTypeRef = firebase.database().ref(PATHNAME.SERVICETYPE);
    console.log(serviceTypeRef);
    serviceTypeRef.set(object).catch(error => {
     console.log(error);
    });

    // console.log(this.filePath);
  }

  createMemberTypesMasterData() {
    let memberTypes:{typeId:number,type:string}[];
    memberTypes = [
                    {typeId:1, type:'Owner'},
                    {typeId:2, type:'Tanent'},
                    {typeId:3, type:'Relative'}
                  ];
    let  memberTypesRef = firebase.database().ref(PATHNAME.MEMBERTYPE);   
    memberTypesRef.set(memberTypes)
    .then(date =>{
      console.log('Created Successfully');
    })
    .catch(error => {
      console.log(error);
     });               

  }

  createSubscriptionTypesMasterData() {
    let subscriptionTypes:SubscriptionType[];
    subscriptionTypes = [
                    {typeId:1, name:'Swimming'},
                    {typeId:2, name:'Gym'},
                    {typeId:3, name:'Community Hall'}
                  ];
    let  subscriptionTypesRef = firebase.database().ref(PATHNAME.SUBSCRIPTIONTYPE);   
    subscriptionTypesRef.set(subscriptionTypes)
    .then(date =>{
      console.log('Created Successfully');
    })
    .catch(error => {
      console.log(error);
     });               

  }

  onFileSelected($event:any) {
    this.file = $event.target.files[0];
    
    console.log(this.file);
    let fileRef = firebase.storage().ref();
    fileRef.child('images/' + this.file.name).put(this.file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    }).catch(error => {
      console.log('Error Pankaj ', error);
    });

  }

  downloadUrlFromFirebase() {
    firebase.storage().ref().child('pankaj.jpg').getDownloadURL()
      .then(response => {
         this.someTextUrl = response;
         console.log("Pankaj ", this.someTextUrl);
        }
      )

      .catch(error => console.log('error', error))
  }



  // constructFilePath() {
  //   this.storage.get('buildingId').then((val) => {
  //     this.filePath = this.filePath + val + '/';
  //   }).then(data => {
  //     this.storage.get('flat').then((val) => {
  //       this.filePath = this.filePath + val + '/';
  //     }).then(() => {
  //       let d = new Date();
  //       let n = d.getTime();
  //       this.filePath = this.filePath + n + '.jpg';
  //     }) 
    
  //   })
  // }

  printMemberType() {
    console.log(' I am outside start the printMemberType of subcribe method ');

    this.memberTypeService.getMemberTypeMasterData();
    console.log(' I am outside END the printMemberType of subcribe method ');
  }

        
      
  ngOnDestroy(){
    this.memberTypeService.memTypeMastDataSubject.unsubscribe();

  }

  updateUser() {
    let key = '-LGTo3JEbFbHzbpcFRyA';
    let user:User = {
      firstName:'Pankaj',
      lastName:'Tiwary',
      active:true,
      createdDate:new Date().getTime(),
      gender:GENDER.MALE,
      memberTypeId:MEMBERTYPE.OWNER,
      mobileNumber:'37373737',
      downloadbleUrl:'assets/imgs/man.changing',
      imageLoc:'My New Location'
    }
    // this.userSvc.updateUser(user, key);
  }

  getAllUsers() {
    this.userSvc.getAllUsers(4,503);
  }
}

