import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { detailsservice } from '../shared/details.service';
import { AuthenticateService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-chat-ivr',
  templateUrl: './chat-ivr.page.html',
  styleUrls: ['./chat-ivr.page.scss'],
})
export class ChatIvrPage implements OnInit {

  profile_url: string;
  msg: any;
  time: any;

  @ViewChild('content',  {static: false}) content: any;
  objDiv: any;
  number: any = 1;
  validations_form: FormGroup;
  sendedMessage: any;
  sendValue = '';
  count: number;
  user_name: string;

  validation_messages = {
    num: ['']
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private aptservice: detailsservice,
              private authService: AuthenticateService,
              public afAuth: AngularFireAuth

    ) {

   }


  ngOnInit() {
    if (localStorage.getItem('profile_url')) {
      this.profile_url = localStorage.getItem('profile_url');
    } else {
      this.profile_url = '../../assets/ubold/layouts/light/assets/images/man.png';
    }
    this.count = 3;
    this.afAuth.authState.subscribe(user => {
      if (user.emailVerified) {
          document.getElementById('chat_emailverify').remove();
          this.count = this.count - 1;
      }
      const key = localStorage.getItem('uid');
      const ref = firebase.database().ref('users/' + key);
      ref.once('value', res => {
        this.user_name = res.val().name;
        if (res.val().numberverfied == 1) {
            document.getElementById('phoneverify').remove();
            this.count = this.count - 1;
          }
      });
    });
    // this.number=1
    this.time = new Date().toLocaleTimeString();
    this.msg = [];
    this.sendedMessage = [];
    this.objDiv = document.getElementById('chatdiv');
    this.objDiv.scrollTop = this.objDiv.scrollHeight;

    this.validations_form = this.formBuilder.group({
      num: ['']
    });

    const isMobile = {
      Android() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };
    if ( isMobile.any() ) {
      document.getElementById('chat_leftbar').style.left = '-270px';
    } else {
      document.getElementById('chat_leftbar').style.left = '0px';
    }
  }


  sendMessage(msg) {
    this.sendValue = null;
    if (this.number === 1 && msg.num !== undefined && msg.num !== null && msg.num !== '#' && msg.num < 10 && msg.num > 0) {
      this.sendedMessage.push(msg.num);
      this.http.get('https://ashwin1111-node.glitch.me/api/ivr/get_second?number1=' + msg.num).toPromise().then(res => {
      const resultArray = Object.keys(res).map(function(obj) {
        const person = res[obj].description;
        return person;
    });
      this.msg.push(resultArray);
      setTimeout(() => {
        this.objDiv = document.getElementById('chatdiv');
        this.objDiv.scrollTop += 1200;
      }, 20);
    });
    } else if (msg.num === '#' && msg.num !== undefined && msg.num !== null ) { // && msg.num > 10 && msg.num < 0
      this.http.get('https://ashwin1111-node.glitch.me/api/ivr/get_info').toPromise().then(res => {
        this.msg.push(res[0].content);
        this.sendedMessage.push(msg.num);
        setTimeout(() => {
          this.objDiv = document.getElementById('chatdiv');
          this.objDiv.scrollTop += 1200;
        }, 20);
      });
    } else if (msg.num !== undefined && msg.num !== null ) {
      this.msg.push('Invalid characters');
      this.sendedMessage.push(msg.num);
      setTimeout(() => {
        this.objDiv = document.getElementById('chatdiv');
        this.objDiv.scrollTop += 1200;
      }, 100);
    }
  }
  opt() {
    this.aptservice.getnumber();
  }
  home() {
    this.navCtrl.navigateForward('/dashboard');
  }
  askhelp() {
    this.navCtrl.navigateForward('/neighbour');
  }
  chatbot() {
    this.navCtrl.navigateForward('/chat-ivr');
  }
  redirect_warning() {
    this.navCtrl.navigateForward('/warning');
  }
  blog() {
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
    .catch(error => {
    });
  }

  showleft() {
    if (document.getElementById('chat_leftbar').style.left == '-270px') {
      document.getElementById('chat_leftbar').style.left = '0px';
    } else {
      document.getElementById('chat_leftbar').style.left = '-270px';
    }
  }
  hideleft() {
    if (document.getElementById('chat_leftbar').style.left == '0px') {
      document.getElementById('chat_leftbar').style.left = '-270px';
    }
}
}


