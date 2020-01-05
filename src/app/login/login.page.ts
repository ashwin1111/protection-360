import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  profile_url:string;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      if (localStorage.getItem('uid')) {
        this.afAuth.authState.subscribe(user => {
          if(user.emailVerified){
            this.navCtrl.navigateForward('/dashboard');
          }
          else{
            this.spinner.hide();
            this.errorMessage = "Your Email not verified yet";
          }
        });
      }
    }, 700);
    this.spinner.hide();
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
  };

  loginUser (value) {
    this.authService.loginUser(value)
    .then(res => {
    
      var ref= firebase.database().ref('users/'+res.user.uid);
      ref.once('value',res1=>{
        if(res1.hasChild('img_url')){
          localStorage.setItem('profile_url',res1.val().img_url);
          this.profile_url=res1.val().img_url;
        }
        console.log('logged in successfully with user details:', res);
        localStorage.setItem("uid",res.user.uid);
        this.errorMessage = "";
        this.afAuth.authState.subscribe(user => {
          if(user.emailVerified){
            if (localStorage.getItem('registrationDone')) {
              this.navCtrl.navigateForward('/dashboard');        
            } 
            else {
              this.navCtrl.navigateForward('/registration-form');        
            }
          }else{
            this.errorMessage = "Your Email not verified yet";
          }
        })
      });
     
      //this.navCtrl.navigateForward('/dashboard');
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  } 
}