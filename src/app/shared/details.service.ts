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
    var key = localStorage.getItem('uid');
    this.bookingListRef=db.list('users/'+key);
   }

  // Create
  createBooking(apt: Details) {
    return new Promise<any>((resolve,reject)=>{
      this.bookingListRef.push({
      name: apt.name,
      mobile: apt.mobile,
      email: apt.address,
      dob:apt.dob,
      gender:apt.gender,
      occupation:apt.occupation,
      fathername:apt.fathername,
      fathernumber:apt.fathernumber,
      fatheraddress:apt.fatheraddress,
      fatheremail:apt.fatheremail,
      gname:apt.gname,
      gnumber:apt.gnumber,
      gaddress:apt.gaddress,
      gemail: apt.gemail
    }).then(
      res=>resolve(res),
      err=>reject(err))
    })
  }
}