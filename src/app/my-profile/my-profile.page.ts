import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from '@angular/fire/storage';
import { detailsservice } from '../shared/details.service';

export interface Image {
  id: string;
  image: string;
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {


 url: any;
  loading: boolean = false;
  newImage: Image = {
    id: localStorage.getItem('uid'), image: ''
  }
  user_name:string;
  profile_url:string;
  count:number;
  name:string;
  email:string;
  mobileno:number;
  cur_add:string;
  DOB:string;
  gender:string;
  Occupation:string;
  fname:string;
  fnumber:number;
  femail:string;
  faddress:string;
  gname:string;
  gnumber:number;
  gemail:string;
  gaddress:string;
  emailper:string;

  constructor(private navCtrl: NavController,
    public afAuth: AngularFireAuth,
     private storage: AngularFireStorage,
    private aptservice:detailsservice,
     private authService: AuthenticateService) { 
      if(localStorage.getItem('profile_url')){
        this.profile_url=localStorage.getItem('profile_url');
      }
      else{
        this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
      }  }

  ngOnInit() {
    this.count=3;
    this.afAuth.authState.subscribe(user => {
      if(user.emailVerified){
          document.getElementById('profile_emailverify').remove();
          this.count=this.count-1;
      }
      var key = localStorage.getItem('uid');
      var ref= firebase.database().ref('users/'+key);
      ref.once('value',res=>{
         this.user_name=res.val().name;
        this.name=res.val().name;
  this.email=user.email;
  this.mobileno=res.val().mobile_number;
  this.cur_add=res.val().current_address;
  this.DOB=res.val().date_of_birth;
  this.gender=res.val().gender;
  this.Occupation=res.val().occupation;
  this.fname=res.val().father_name;
  this.fnumber=res.val().father_mobile_number;
  this.femail=res.val().father_email_address;
  this.faddress=res.val().father_current_address;
  this.gname=res.val().guardian_name;
  this.gnumber=res.val().guardian_mobile_number;
  this.gemail=res.val().guardian_email_address;
  this.gaddress=res.val().guardian_current_address;
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
      document.getElementById('profile_leftbar').style.left="-270px";
    }else{
      document.getElementById('profile_leftbar').style.left="0px";
    }
  }

  goToRegisterForm() {
    this.navCtrl.navigateForward('/registration-form');
  }
  showleft(){
    if(document.getElementById('profile_leftbar').style.left=="-270px"){
      document.getElementById('profile_leftbar').style.left="0px";
    }else{
      document.getElementById('profile_leftbar').style.left="-270px";
    }
  }

  hideleft(){
    if(document.getElementById('profile_leftbar').style.left=="0px"){
      document.getElementById('profile_leftbar').style.left="-270px";
    }

    // if(document.getElementById('rightbar').style.right=="0px"){
    //   document.getElementById('rightbar').style.right="-270px";
    // }
  }

  triggerin(){
    document.getElementById('img').click();
    //$('#img').trigger("click");
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
}
