import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationFormPageRoutingModule } from './registration-form-routing.module';

import { RegistrationFormPage } from './registration-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationFormPage]
})
export class RegistrationFormPageModule {}
