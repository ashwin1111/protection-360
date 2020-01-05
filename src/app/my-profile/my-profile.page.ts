import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  profile_url:string;
  constructor() { 
    this.profile_url=localStorage.getItem('profile_url');
  }

  ngOnInit() {
  }

}
