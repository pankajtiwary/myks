import { Component } from '@angular/core';
// import { NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'noticeboard',
    templateUrl: 'noticeboard.html'
  })
export class NoticeBoardPage {

    notices:any[];

    constructor() {
        this.notices = [{title:"Some Notice 1", date:"19-06-18", 
        notice: ["Pool will be remain closed on so so Date", "Pool will be remain closed on so so Date"]},
        {title:"Some Notice 2", date:"19-06-18", 
        notice: ["Pool will be remain closed on so so Date", "Pool will be remain closed on so so Date"]}];
    }

}