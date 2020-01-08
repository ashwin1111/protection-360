import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { detailsservice } from '../shared/details.service';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.page.html',
  styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {
  registration_form: FormGroup;
  profile_url:string;
 user_name:string;
 count:number;
 user_mail:string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private aptservice:detailsservice,
    private authService: AuthenticateService,
    public afAuth: AngularFireAuth
    ) {  if (!localStorage.getItem('uid')) {
      this.navCtrl.navigateForward('');
    }else{
      if(localStorage.getItem('profile_url')){
        this.profile_url=localStorage.getItem('profile_url');
      }
      else{
        this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
      }
    }
  }

  //  validation_messages = {
  //   'name': [
  //     { type: 'required', message: 'Name is required.' },
  //     { type: 'pattern', message: 'Please enter a valid name.' }
  //   ],
  //   'mobile_number': [
  //     { type: 'required', message: 'Mobile Number is required.' },
  //     { type: 'pattern', message: 'Please enter a valid mobile number.' }
  //   ],
  //   'current_address' :[
  //     { type: 'required', message: 'Mobile Number is required.' },
  //     { type: 'pattern', message: 'Please enter a valid mobile number.' }
  //   ],
  //   'father_name': [
  //     { type: 'required', message: 'Name is required.' },
  //     { type: 'pattern', message: 'Please enter a valid name .' }
  //   ],
  //   'father_mobile_number': [
  //     { type: 'required', message: 'Mobile number is required.' },
  //     { type: 'pattern', message: 'Please enter a valid mobile number.' }
  //   ],
  //   'father_email_address' :[
  //     { type: 'required', message: 'Email address is required.' },
  //     { type: 'pattern', message: 'Please enter a valid  email address.' }
  //   ],
  //   'guardian_name': [
  //     { type: 'required', message: 'Email address is required.' },
  //     { type: 'pattern', message: 'Please enter a valid email address.' }
  //   ],
  //   'guardian_mobile_number' :[
  //     { type: 'required', message: 'Mobile number is required.' },
  //     { type: 'pattern', message: 'Please enter a valid mobile number.' }
  //   ],
  //   'guardian_email_address' :[
  //     { type: 'required', message: 'Email address is required.' },
  //     { type: 'pattern', message: 'Please enter a valid email address.' }
  //   ]

  // };

  validation_messages = {
      'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],
      'email': [''],
      'mobile_number': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'pattern', message: 'Please enter a valid mobile number.' }
    ],
      
       'current_address': [
          { type: 'required', message: 'Address is required.' },
       ],
       'date_of_birth': [''],
       'occupation': [
      { type: 'required', message: 'Occupation is required.' },
      { type: 'pattern', message: 'Please enter a occupation.' }
    ],
       'father_name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter a valid name .' }
    ],
       'father_mobile_number': [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'pattern', message: 'Please enter a valid mobile number.' }
    ],
      'father_email_address': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Please enter a valid  email address.' }
    ],
       'father_current_address': [''],
      'guardian_name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],  
      'guardian_mobile_number': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'pattern', message: 'Please enter a valid mobile number.' }
    ],
      'guardian_email_address': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Please enter a valid  email address.' }
    ],
       'guardian_current_address': [''],
      'gender': ['']
  }

  ngOnInit() {
    if(localStorage.getItem('profile_url')){
      this.profile_url=localStorage.getItem('profile_url');
    }
    else{
      this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
    }
    // this.count=3;
    // this.afAuth.authState.subscribe(user => {
    //   if(user.emailVerified){
    //       document.getElementById('reg_emailverify').remove();
    //       this.count=this.count-1;
    //   }
    //   var key = localStorage.getItem('uid');
    //   var ref= firebase.database().ref('users/'+key);
    //   ref.once('value',res=>{
    //     this.user_name=res.val().name;
    //       if(res.val().numberverfied==1){
    //         document.getElementById('phoneverify').remove();
    //         this.count=this.count-1;
    //       }
    //   });
    // });
    this.afAuth.authState.subscribe(user => {
      this.user_mail=user.email;
    });
    var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };
    // if( isMobile.any() ){
    //   document.getElementById('reg_leftbar').style.left="-270px";
    // }else{
    //   document.getElementById('reg_leftbar').style.left="0px";
    // } 
  //   this.registration_form = this.formBuilder.group({
  //     name: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
  //     ])),
  //     email: new FormControl('', Validators.compose([
  //       Validators.required
  //     ])),
  //      mobile_number: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^([0|\+[0-9]{1,10})$')
  //     ])),
  //      current_address: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //      date_of_birth: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //      occupation: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //     father_name: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[A-Za-z]+$')
  //     ])),
  //     father_mobile_number: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^([0|\+[0-9]{1,10})$')
  //     ])),
  //     father_email_address: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //      father_current_address: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //     guardian_name: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
  //     ])),
  //     guardian_mobile_number: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^([0|\+[0-9]{1,10})$')
  //     ])),
  //     guardian_email_address: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //      guardian_current_address: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //     gender: new FormControl('', Validators.compose([
  //       Validators.required
  //     ])),
  //   });
    this.registration_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
      ])),
      email: [''],
     mobile_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])),
       current_address: [''],
       occupation:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
      ])),
       date_of_birth: [''],
       father_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
      ])),
        father_mobile_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])),
     father_email_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       father_current_address: [''],
      guardian_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(?:-[a-zA-Z]+)*$')
      ])),
      guardian_mobile_number:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])),
      guardian_email_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       guardian_current_address: [''],
      gender: ['']
    });
  }

gender(value) {

}

  register (formValues) {
    this.aptservice.createBooking(this.registration_form.value).then(res=>{
      localStorage.setItem('registrationDone', 'yes');
      this.registration_form.reset();
      this.router.navigate(['/dashboard']);
    })
    }
     registration(){
  }
  opt(){
    this.aptservice.getnumber();
  }
  home(){
    this.navCtrl.navigateForward('/dashboard');
  }
  askhelp(){
    this.navCtrl.navigateForward('/neighbour');
  }
  chatbot(){
    this.navCtrl.navigateForward('/chat-ivr');
  }
  redirect_warning(){
    this.navCtrl.navigateForward('/warning');
  }
  blog(){
    this.navCtrl.navigateForward('/safety-measures');
  }
  goToProlfilePage() {
    this.navCtrl.navigateForward('/my-profile');
  }
  logout() {
    this.authService.logoutUser()
    .then(res => {
      localStorage.removeItem('uid');
      localStorage.removeItem('profile_url');
      this.navCtrl.navigateBack('');
    })
  }
  
  
  }

