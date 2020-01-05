import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  profile_url:string;
  constructor(private navCtrl: NavController) { 
    this.profile_url=localStorage.getItem('profile_url');
  }

  ngOnInit() {
  }

  goToRegisterForm() {
    this.navCtrl.navigateForward('/registration-form');
  }

}
