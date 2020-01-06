import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatIvrPageRoutingModule } from './chat-ivr-routing.module';

import { ChatIvrPage } from './chat-ivr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatIvrPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChatIvrPage]
})
export class ChatIvrPageModule {}
