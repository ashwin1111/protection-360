import { Injectable } from '@angular/core';

import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.bookingListRef = db.list('users');
   }

  // Create
  createBooking(app) {
    let appointment = new Appointment(app.name,app.email,app.mobile);
    return  new Promise<any>((resolve, reject) => {
      this.bookingListRef.push({
        name:app.name,
        email:app.email,
        mobile:app.mobile
      }) .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  getBookingList() {
    this.bookingListRef = this.db.list('/users');
    return this.bookingListRef;
  }
  
  }

  // Get Single
  // getBooking(id: string) {
  //   this.bookingRef = this.db.object('/users');
  //   return this.bookingRef;
  // }

  // Get List
  

  // Update
  // updateBooking(id, apt: Appointment) {
  //   return this.bookingRef.update({
  //     name: apt.name,
  //     email: apt.email,
  //     mobile: apt.mobile
  //   })
  //}

  // Delete
  // deleteBooking(id: string) {
  //   this.bookingRef = this.db.object('/appointment/' + id);
  //   this.bookingRef.remove();
  // }