import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavComponent } from '../nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavComponent
  ],
  
})
export class DashboardModule { 
  constructor() {
    console.log("DashboardModule created");
  }
}
