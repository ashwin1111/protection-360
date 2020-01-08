import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core'
import { NavController, ModalController } from '@ionic/angular';
import { detailsservice } from '../shared/details.service';
import { AuthenticateService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-safety-measures',
  templateUrl: './safety-measures.page.html',
  styleUrls: ['./safety-measures.page.scss'],
})

export class SafetyMeasuresPage implements OnInit {

profile_url:string;
  msg: any;
  time: any;

  @ViewChild('content',  {static: false}) content: any;
  objDiv:any;
  number: any = 1;
  sendedMessage: any;
  sendValue:string = '';
  count:number;
  user_name:string;

  validation_messages = {
    'num': ['']
  }

  constructor(private http: HttpClient,
    private navCtrl: NavController,
    private aptservice:detailsservice,
    private authService: AuthenticateService,
    public afAuth: AngularFireAuth

    ) {
   
   }
  

  ngOnInit() {
    if(localStorage.getItem('profile_url')){
      this.profile_url=localStorage.getItem('profile_url');
    }
    else{
      this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
    }
    this.count=3;
    this.afAuth.authState.subscribe(user => {
      if(user.emailVerified){
          document.getElementById('safe_emailverify').remove();
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
      document.getElementById('safe_leftbar').style.left="-270px";
    }else{
      document.getElementById('safe_leftbar').style.left="0px";
    }
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
  
  showleft(){
    if(document.getElementById('safe_leftbar').style.left=="-270px"){
      document.getElementById('safe_leftbar').style.left="0px";
    }else{
      document.getElementById('safe_leftbar').style.left="-270px";
    }
  }
  hideleft(){
    if(document.getElementById('safe_leftbar').style.left=="0px"){
      document.getElementById('safe_leftbar').style.left="-270px";
    }
}
}