import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationClientComponent } from './reservation-client.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    
    CalendarModule.forRoot({ provide: DateAdapter, useClass: MomentDateAdapter }),
  ],
  exports: [],
 
})
export class ReservationClientModule {}
