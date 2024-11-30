import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerProfileRoutingModule } from './worker-profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkerProfileRoutingModule,
    MatButtonModule,MatTooltipModule,MatCardModule,MatStepperModule,MatListModule ,MatFormFieldModule,MatInputModule,MatIconModule,MatAutocompleteModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule
  ]
})
export class WorkerProfileModule { }
