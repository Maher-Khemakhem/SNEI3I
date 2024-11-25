import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';  // for navigation buttons
import { MatIconModule } from '@angular/material/icon';      // optional for step icons
import { MatFormFieldModule } from '@angular/material/form-field'; // optional if using forms
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { BrowserModule } from '@angular/platform-browser';

import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    BrowserModule,MatOptionModule,MatSelectModule,CarouselModule
    
  ],
  providers: [
    
  ],
})
export class AppModule { }
