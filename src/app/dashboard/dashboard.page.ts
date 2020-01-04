import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
 
  userEmail: string;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) {
    if (!localStorage.getItem('uid')) {
      this.navCtrl.navigateForward('');
    }
  }
 
  ngOnInit() {
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
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  showright(){
      document.getElementById('rightbar').style.right='0px';
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
}