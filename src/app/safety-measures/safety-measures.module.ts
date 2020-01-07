import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafetyMeasuresPageRoutingModule } from './safety-measures-routing.module';

import { SafetyMeasuresPage } from './safety-measures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafetyMeasuresPageRoutingModule
  ],
  declarations: [SafetyMeasuresPage]
})
export class SafetyMeasuresPageModule {}
