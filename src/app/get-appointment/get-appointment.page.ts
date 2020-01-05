import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';


@Component({
  selector: 'app-get-appointment',
  templateUrl: './get-appointment.page.html',
  styleUrls: ['./get-appointment.page.scss'],
})
export class GetAppointmentPage implements OnInit {
  Bookings = [];  
  constructor( private aptService: AppointmentService) { }

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
  }
  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

}
