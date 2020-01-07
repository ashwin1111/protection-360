import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeighbourPageRoutingModule } from './neighbour-routing.module';

import { NeighbourPage } from './neighbour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeighbourPageRoutingModule
  ],
  declarations: [NeighbourPage]
})
export class NeighbourPageModule {}
