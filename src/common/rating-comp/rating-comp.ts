import { Component,Input, OnInit,OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rating-comp',
  templateUrl: 'rating-comp.html'
})
export class RatingComponent implements OnInit , OnChanges {

  starscount:any = [];
  @Input()  
  readonly:string;
  @Input()
  rating:number;
  @Input()
  closingRemark:string;

  @Input()
  closingRemarkLabel:string;

  internalreadonly:boolean;

  @Output() ratingChanged: EventEmitter<number> =   new EventEmitter();

  @Output() closingRemarkChanged: EventEmitter<string> =   new EventEmitter();

  constructor() {
   
  }
  ngOnInit() {
    this.internalreadonly = this.readonly == 'true';
    this.rate(this.rating);
    if(this.closingRemarkLabel == undefined) {
      this.closingRemarkLabel = 'Closing Remark & Feedback';
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.readonly) {
      this.readonly = changes.readonly.currentValue
    }
    if(changes.rating) {
      this.rating = changes.rating.currentValue;
    }
    if(changes.closingRemark) {
      this.closingRemark = changes.closingRemark.currentValue;
    }
    this.ngOnInit();
  }
  onRate(star:any) {
    console.log("Type " + typeof this.readonly, this.readonly);
    if(this.internalreadonly === true) {
      return;
    } else {
      this.rate(star.rating);
    }
    this.ratingChanged.emit(star.rating);
  }
  init() {
    for(let i=0;i<5;i++) {
      this.starscount[i] = {};
      this.starscount[i].rating = i+1;
      this.starscount[i].starimg='starempty';
    }
  }

  rate(rating:number) {
    this.init();
    for(let i=0;i<rating;i++) {
      this.starscount[i].rating = i+1;
      this.starscount[i].starimg='starfull';
    }

  }

  closingRemarkChange() {
    this.closingRemarkChanged.emit(this.closingRemark);
  }


}