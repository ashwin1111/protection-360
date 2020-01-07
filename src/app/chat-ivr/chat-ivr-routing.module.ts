import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatIvrPage } from './chat-ivr.page';

const routes: Routes = [
  {
    path: '',
    component: ChatIvrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatIvrPageRoutingModule {}
