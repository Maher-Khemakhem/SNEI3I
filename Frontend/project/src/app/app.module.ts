import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';  // for navigation buttons
import { MatIconModule } from '@angular/material/icon';      // optional for step icons
import { MatFormFieldModule } from '@angular/material/form-field'; // optional if using forms
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class AppModule { }
