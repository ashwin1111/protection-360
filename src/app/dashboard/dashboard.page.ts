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
  ) {}
 
  ngOnInit() {
    
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }
 
  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
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

    if(document.getElementById('rightbar').style.right=="0px"){
      document.getElementById('rightbar').style.right="-270px";
    }
  }
}