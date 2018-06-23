import { Component,Input } from '@angular/core';

@Component({
  selector: 'homepageblock',
  templateUrl: 'homepageblock.html'
})
export class HomePageBlock {

  @Input() heading:string;
  @Input() imgname:string;
  constructor() {

  }
}