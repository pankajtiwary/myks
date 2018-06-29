import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AdminWorklistPage } from '../../admin-worklist/admin-worklist-page';


@Component({
    selector: 'signin-page',
    templateUrl: 'signin-page.html'
  })
  export class SigninPage implements OnInit {

    signInForm: FormGroup;
    pwdfieldtype:string = 'password';
    pwdiconname:string = 'md-eye-off';
    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    ngOnInit() {
      this.signInForm = new FormGroup({
        'userId': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      });

    }

    togglePassword() {
      console.log("I am inside the togglePassword")
      if (this.pwdfieldtype === 'password') {
        this.pwdfieldtype = 'input';
        this.pwdiconname ='md-eye';
      } else {
        this.pwdfieldtype = 'password';
        this.pwdiconname ='md-eye-off';
      }
    }

    signin() {
      this.navCtrl.push(AdminWorklistPage);
    }
  }