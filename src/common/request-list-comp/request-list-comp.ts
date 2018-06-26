import { Component,Input } from '@angular/core';

@Component({
  selector: 'request-list-comp',
  templateUrl: 'request-list-comp.html'
})
export class RequestListComp {

  @Input() request:any;
  // @Input() imgname:string;
  constructor() {

  }
}