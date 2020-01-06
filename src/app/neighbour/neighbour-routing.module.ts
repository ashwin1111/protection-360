import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeighbourPage } from './neighbour.page';

const routes: Routes = [
  {
    path: '',
    component: NeighbourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeighbourPageRoutingModule {}
