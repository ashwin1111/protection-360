import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafetyMeasuresPage } from './safety-measures.page';

const routes: Routes = [
  {
    path: '',
    component: SafetyMeasuresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafetyMeasuresPageRoutingModule {}
