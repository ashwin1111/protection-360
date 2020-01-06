import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core'


@Component({
  selector: 'app-chat-ivr',
  templateUrl: './chat-ivr.page.html',
  styleUrls: ['./chat-ivr.page.scss'],
})
export class ChatIvrPage implements OnInit {

  profile_url:string;
  msg: any;
  time: any;

  @ViewChild('content',  {static: false}) content: any;
  objDiv:any;
  number: any = 1;
  validations_form: FormGroup;
  sendedMessage: any;
  sendValue:string = '';

  validation_messages = {
    'num': ['']
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    if(localStorage.getItem('profile_url')){
      this.profile_url=localStorage.getItem('profile_url');
    }
    else{
      this.profile_url="../../assets/ubold/layouts/light/assets/images/man.png";
    }
   }
  

  ngOnInit() {
    //this.number=1
    this.time = new Date().toLocaleTimeString()
    this.msg=[]
    this.sendedMessage=[]
    this.objDiv = document.getElementById("chatdiv");
    this.objDiv.scrollTop = this.objDiv.scrollHeight;

    this.validations_form = this.formBuilder.group({
      num: ['']
    });

    // this.http.get('http://quotes-node-api-postgres.herokuapp.com/api/ivr/get_all_first').toPromise().then(res=> {
    //   console.log('received serv', res)
    //   var resultArray = Object.keys(res).map(function(obj){
    //     let person = res[obj].description;
    //     return person;
    // });
    // this.msg.push(resultArray)
    // console.log('this.sendedMessage', this.sendedMessage)
    // })
  }

  sendMessage(msg) {
    this.sendValue = null;
    if (this.number === 1 && msg.num !== undefined && msg.num !== null && msg.num !== '#' && msg.num < 10 && msg.num > 0) {
      this.sendedMessage.push(msg.num)
      this.http.get('https://ashwin1111-node.glitch.me/api/ivr/get_second?number1='+msg.num).toPromise().then(res=> {
      var resultArray = Object.keys(res).map(function(obj){
        let person = res[obj].description;
        return person;
    });
    this.msg.push(resultArray)
      setTimeout(() => {
        this.objDiv = document.getElementById("chatdiv");
        this.objDiv.scrollTop +=1200;
      }, 20);
    })
    } else if (msg.num === '#' && msg.num > 10 && msg.num < 0 && msg.num !== undefined && msg.num !== null ) {
      this.http.get('https://ashwin1111-node.glitch.me/api/ivr/get_info').toPromise().then(res=> {
        this.msg.push(res[0].content)
        this.sendedMessage.push(msg.num)
        setTimeout(() => {
          this.objDiv = document.getElementById("chatdiv");
          this.objDiv.scrollTop +=1200;
        }, 20);
      })
    } else if (msg.num !== undefined && msg.num !== null ) {
      this.msg.push('Invalid characters')
      this.sendedMessage.push(msg.num)
      setTimeout(() => {
        this.objDiv = document.getElementById("chatdiv");
        this.objDiv.scrollTop +=1200;
      }, 100);
    }
  }
}
