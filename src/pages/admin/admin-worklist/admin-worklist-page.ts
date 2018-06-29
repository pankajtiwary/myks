import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import {MyFlatPage} from '../../myflat-page/myflat-page';

@Component({
    selector: 'admin-worklist-page',
    templateUrl: 'admin-worklist-page.html'
  })
  export class AdminWorklistPage  {
    worklists:any[] = [];
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.worklists = [
            {id:1, icon:"addperson",title:'Add/Modify Member'},
            {id:2,icon:"swimming",title:'Manage Swimming Pass'},
            {id:3,icon:"electrician",title:'Manage Electrician Request'},
            {id:4,icon:"plumber",title:'Manage Plumber Request'},
            {id:5,icon:"housekeeping",title:'Manage Hourse Keeping Request'},
            {id:6,icon:"carpenter",title:'Manage Carpenter Request'}
        ];
    }

    itemTapped(workitem:{id:number, icon:string, title:string}) {
        switch(workitem.id) {
            case 1:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 2:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 3:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 4:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 5:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;
            case 6:
                this.navCtrl.push(MyFlatPage, {admin:true});
                break;                                  
        } 

    }

  }