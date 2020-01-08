import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { detailsservice } from '../shared/details.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-neighbour',
  templateUrl: './neighbour.page.html',
  styleUrls: ['./neighbour.page.scss'],
})
export class NeighbourPage implements OnInit {
public profile_url:string;
  count:number;
    user_name:string;
    replydet1:string;
    postbutton:any;
  constructor(  private navCtrl: NavController,
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private aptservice:detailsservice,
    public afAuth: AngularFireAuth) {
    
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
      this.addpost();
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
      document.getElementById('neighbour_leftbar').style.left="-270px";
    }else{
      document.getElementById('neighbour_leftbar').style.left="0px";
    }
  }

  addpost(){
    var dref= firebase.database().ref('question');
    dref.once('value',res=>{
       res.forEach(snapshot=>{
          document.getElementById('post').innerHTML+=`<div id="`+snapshot.key+`" class="border border-light p-3 mb-3"><div class="media">
<img class="mr-2 avatar-sm rounded-circle" src="`+snapshot.val().profile_url+`" alt="Generic placeholder image"><div class="media-body"><h5 class="m-0">`+snapshot.val().name+`</h5>
<p class="text-muted"><small>about 1 hour ago</small></p></div></div> <div class="font-16 text-center font-italic text-dark">
<i class="mdi mdi-format-quote-open font-20"></i>`+snapshot.val().question+`</div></div><br>`;
              if(snapshot.hasChild('reply')){

                  var ref1 = firebase.database().ref('question/'+snapshot.key+'/reply');
                  ref1.once('value',res1=>{
                 var inner=`<div id="`+snapshot.key+`comment" class="post-user-comment-box">`;
                    res1.forEach(snapshot1=>{
                      if(snapshot1.key!='test'){
                        inner=inner+`<div class="media">
<img class="mr-2 avatar-sm rounded-circle" src="`+snapshot1.val().profile_url+`" alt="Generic placeholder image">
<div class="media-body"><h5 class="mt-0">`+snapshot1.val().name+`        <small class="text-muted">3 hours ago</small></h5>
`+snapshot1.val().reply+`</div></div><br>`;
                      }
                      
                    });
  inner=inner+`<div id="`+snapshot.key+`box" class="media mt-2">
<a class="pr-2" ><img  src="`+this.profile_url+`" class="rounded-circle" alt="Generic placeholder image" height="31">
</a> <div class="media-body"><input style="border:1px solid #ced4da !important;" type="text"  id="`+snapshot.key+`simpleinput" class="form-control border-0 form-control-sm" placeholder="Add comment"><br>
<button (click)="alerts()" data-name="`+this.user_name+`" data-src="`+this.profile_url+`" id="`+snapshot.key+`post"  class="btn btn-sm btn-dark waves-effect waves-light">Post</button>
</div></div>`;
document.getElementById(snapshot.key).insertAdjacentHTML("beforeend",inner);
document.getElementById(snapshot.key+"post").addEventListener("click", (event)=>this.reply(snapshot.key));
});  
}
else
{
var inner1=`<div id="`+snapshot.key+`comment" class="post-user-comment-box">`;
inner1=inner1+`<div id="`+snapshot.key+`box" class="media mt-2">
<a class="pr-2" ><img  src="`+this.profile_url+`" class="rounded-circle" alt="Generic placeholder image" height="31">
</a> <div class="media-body"><input style="border:1px solid #ced4da !important;" type="text"  id="`+snapshot.key+`simpleinput" class="form-control border-0 form-control-sm" placeholder="Add comment"><br>
<button id="`+snapshot.key+`post" data-name="`+this.user_name+`" data-src="`+this.profile_url+`" class="btn btn-sm btn-dark waves-effect waves-light">Post</button>
</div></div>`;
document.getElementById(snapshot.key).insertAdjacentHTML("beforeend",inner1);
document.getElementById(snapshot.key+"post").addEventListener("click", (event)=>this.reply(snapshot.key));
    }         
  });
  
    });
  }
 logout() {
    this.authService.logoutUser()
    .then(res => {
      localStorage.removeItem('uid');
      localStorage.removeItem('profile_url');
      this.navCtrl.navigateBack('');
    })
  }
alerts(){
}
  showleft(){
    if(document.getElementById('neighbour_leftbar').style.left=="-270px"){
      document.getElementById('neighbour_leftbar').style.left="0px";
    }else{
      document.getElementById('neighbour_leftbar').style.left="-270px";
    }
  }

  hideleft(){
    if(document.getElementById('neighbour_leftbar').style.left=="0px"){
      document.getElementById('neighbour_leftbar').style.left="-270px";
    }
}

reply(key){
  var info={
    profile_url:this.profile_url,
    name:this.user_name,
    reply:(<HTMLInputElement>document.getElementById(key+'simpleinput')).value
  }
 this.aptservice.reply(info,key);
 document.getElementById(key+'box').remove();
 document.getElementById(key+'comment').insertAdjacentHTML("beforeend",`<div class="media"><img class="mr-2 avatar-sm rounded-circle" src="`+this.profile_url+`" alt="Generic placeholder image">
<div class="media-body"><h5 class="mt-0">`+this.user_name+`        <small class="text-muted">3 hours ago</small></h5>
`+info.reply+`</div></div><br><div id="`+key+`box" class="media mt-2">
 <a class="pr-2" ><img  src="`+this.profile_url+`" class="rounded-circle" alt="Generic placeholder image" height="31">
 </a> <div class="media-body"><input style="border:1px solid #ced4da !important;" type="text"  id="`+key+`simpleinput" class="form-control border-0 form-control-sm" placeholder="Add comment"><br>
<button (click)="alerts()" data-name="`+this.user_name+`" data-src="`+this.profile_url+`" id="`+key+`post"  class="btn btn-sm btn-dark waves-effect waves-light">Post</button>
</div></div>`);
this.postbutton=document.getElementById(key+"post");
this.postbutton.addEventListener("click", (event)=>this.reply(key));
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

question(){
 document.getElementById('post').innerHTML='';
  var obj={
    name:this.user_name,
    profile_url:this.profile_url,
    question:(<HTMLInputElement>document.getElementById('question')).value
  }

  this.aptservice.qus(obj);
  this.addpost();
  (<HTMLInputElement>document.getElementById('question')).value='';
}
}
