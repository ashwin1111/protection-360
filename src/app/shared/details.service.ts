import { Injectable } from '@angular/core';

import { Details, profile } from '../shared/Details';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class detailsservice {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
    private http: HttpClient) {
    this.bookingListRef=db.list('users/');
   }

  // Create
  createBooking(apt: Details) {
    return new Promise<any>((resolve,reject)=>{
      var key = localStorage.getItem('uid');
      this.bookingListRef.update(key,apt).then(
      res=>resolve(res),
      err=>reject(err))
    })
  }

  uploadprofile(apt:profile){
    return new Promise<any>((resolve,reject)=>{
      var key = localStorage.getItem('uid');
      this.bookingListRef=this.db.list('users/');
      this.bookingListRef.update(key,apt).then(
      res=>resolve(res),
      err=>reject(err))
    })
  }

  getnumber(){
    var key = localStorage.getItem('uid');
    var ref= firebase.database().ref('users/'+key);
    ref.once('value',res=>{
      var opt=(Math.floor(1000 + Math.random() * 9000) + 1);
      var obj={
        opt:opt
      }
      //var msg="DO+NOT%2CSHARE:"+opt+"%2Cis%2Cyour%2CVerification%2Ccode";
      var msg='Hi%2C+this+is+your+otp+'+opt;
      console.log('momomo', res.val().mobile_number);
      this.http.get('http://instantalerts.co/api/web/send?apikey=632s328863w07io97z6794u48cd1i031&sender=SEDEMO&to=91'+res.val().mobile_number+'&message='+msg).toPromise().then(res=> {
        console.log('eeee', res)
      })
      var smsurl='http://instantalerts.co/api/web/send?apikey=632s328863w07io97z6794u48cd1i031&sender=SEDEMO&to=91'+res.val().mobile_number+'&message='+msg;
       this.sendopt(obj,smsurl);
    });
  }
  
  sendopt(obj,sms){
    console.log(sms);
    
    return new Promise<any>((resolve,reject)=>{
      var key = localStorage.getItem('uid');
      this.bookingListRef=this.db.list('users/');
      this.bookingListRef.update(key,obj).then(
      res=>resolve(res),
      err=>reject(err))
    })
   
  }

  checkopt(){
    var key = localStorage.getItem('uid');
    var ref= firebase.database().ref('users/');
    ref.once('value',res=>{
        var opt=res.val().opt;

    })
  }
}