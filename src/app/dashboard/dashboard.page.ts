import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { detailsservice } from '../shared/details.service';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';


export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})



export class DashboardPage implements OnInit {
 
  url: any;
  loading: boolean = false;
   user_name:string;
  newImage: Image = {
    id: localStorage.getItem('uid'), image: ''
  }
  userEmail: string;
  profile_url:string;
  count:number;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private aptservice:detailsservice,
    public afAuth: AngularFireAuth
  ) {
    if (!localStorage.getItem('uid')) {
      this.navCtrl.navigateForward('');
    }else{
      if(localStorage.getItem('profile_url')){
        this.profile_url=localStorage.getItem('profile_url');
      }
      else{
        this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
      }
      console.log('profile_url',this.profile_url)
    }
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
      document.getElementById('leftbar').style.left="-270px";
    }else{
      document.getElementById('leftbar').style.left="0px";
    }
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

  home(){
    this.navCtrl.navigateForward('/dashboard');
  }
  askhelp(){
    this.navCtrl.navigateForward('/neighbour');
  }
  chatbot(){
    this.navCtrl.navigateForward('/chat-ivr');
  }
  blog(){
    this.navCtrl.navigateForward('/safety-measures');
  }

  showright(){
      document.getElementById('rightbar').style.right='0px';
  }
  redirect_warning(){
    this.navCtrl.navigateForward('/warning');
  }
  showleft(){
    if(document.getElementById('leftbar').style.left=="-270px"){
      document.getElementById('leftbar').style.left="0px";
    }else{
      document.getElementById('leftbar').style.left="-270px";
    }
  }

  hideleft(){
    if(document.getElementById('leftbar').style.left=="0px"){
      document.getElementById('leftbar').style.left="-270px";
    }

    // if(document.getElementById('rightbar').style.right=="0px"){
    //   document.getElementById('rightbar').style.right="-270px";
    // }
  }

  navigateToRegistration() {
    this.navCtrl.navigateForward('/registration-form');
  }

  navigateToWarning() {
    this.navCtrl.navigateForward('/warning');
  }
  upload(event){
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
     
      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
      
        // For Uploading Image To Firebase
        const fileraw = event.target.files[0];
        console.log(fileraw)
        const filePath = '/Image/ '+ fileraw.name+ '-'+(Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {
            console.log(a);
            var obj={
              img_url:a
            }
            localStorage.setItem('profile_url',a);
            this.profile_url=a;
            this.aptservice.uploadprofile(obj).then(res=>{
            }).catch(error=> console.log(error));
          });
        });
      }, error => {
        alert("Error");
      }

    }
  }

  SaveImageRef(filePath, file) {

    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }

  opt(){
    this.navCtrl.navigateForward('/otp');
    //this.aptservice.getnumber();
  }

  goToProlfilePage() {
    this.navCtrl.navigateForward('/my-profile');
  }
}