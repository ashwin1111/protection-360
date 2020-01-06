import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { detailsservice } from '../shared/details.service';
import * as firebase from 'firebase';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  profile_url:string;
  validations_form: FormGroup;
  errorMessage:string;
  successMessage:string;
 user_name:string;
 count:number;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private aptservice:detailsservice,
     private authService: AuthenticateService,public afAuth: AngularFireAuth) { 
    this.profile_url=localStorage.getItem('profile_url');
  }

  validation_messages = {
    'otp': [
      { type: 'required', message: 'OTP is required' },
      { type: 'minlength', message: 'OTP must be of 4 digits' }
    ]
  };

  verify (value){
    var key = localStorage.getItem('uid');
    var ref= firebase.database().ref('users/'+key);
    ref.once('value',res=>{
        var opt=res.val().opt;
        // console.log("send opt",opt);
        // console.log('otp entered is ', value.otp);
        if(opt==value.otp){
          document.getElementById('content').innerHTML=`<img src='../assets/icon/verified.png'><div class="form-group mb-0 text-center">                                           
          <label class="error-message">Your number verified Successfully</label></div>`;
          var obj={
            numberverfied:1
          }
          this.aptservice.uploadnumber(obj);
          setTimeout( () => {
            this.navCtrl.navigateForward('/dashboard');
       }, 2000);
        }else{
            this.errorMessage="OTP Mismatch";
        }
    })
   
  }

  ngOnInit() {
     this.count=3;
    this.afAuth.authState.subscribe(user => {
      if(user.emailVerified){
          document.getElementById('emailverify').remove();
          this.count=this.count-1;
      }
      var key = localStorage.getItem('uid');
      var ref= firebase.database().ref('users/'+key);
      ref.once('value',res=>{
        this.user_name=res.val().name;
          if(res.val().numberverfied==1){
            document.getElementById('phoneverify').remove();
            this.count=this.count-1;
          }
      });
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
    if( isMobile.any() ){
      document.getElementById('leftbar2').style.left="-270px";
    }else{
      document.getElementById('leftbar2').style.left="0px";
    }
    this.aptservice.getnumber();
    this.validations_form = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
    });
  }

  resendOtp(){
    this.aptservice.getnumber();
  }
  showleft(){
    if(document.getElementById('leftbar2').style.left=="-270px"){
      document.getElementById('leftbar2').style.left="0px";
    }else{
      document.getElementById('leftbar2').style.left="-270px";
    }
  }

  hideleft(){
    if(document.getElementById('leftbar2').style.left=="0px"){
      document.getElementById('leftbar2').style.left="-270px";
    }

    // if(document.getElementById('rightbar').style.right=="0px"){
    //   document.getElementById('rightbar').style.right="-270px";
    // }
  }

 logout() {
    console.log('logout')
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      localStorage.removeItem('uid');
      localStorage.removeItem('profile_url');
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
