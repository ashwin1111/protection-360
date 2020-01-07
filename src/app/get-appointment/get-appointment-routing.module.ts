import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetAppointmentPage } from './get-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: GetAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetAppointmentPageRoutingModule {}
