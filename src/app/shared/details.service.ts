import { Injectable } from '@angular/core';

import { Details } from '../shared/Details';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class detailsservice {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
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
}