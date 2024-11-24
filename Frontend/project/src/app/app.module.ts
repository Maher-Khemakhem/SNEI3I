import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';  // for navigation buttons
import { MatIconModule } from '@angular/material/icon';      // optional for step icons
import { MatFormFieldModule } from '@angular/material/form-field'; // optional if using forms
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { BrowserModule } from '@angular/platform-browser';

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
    BrowserModule
  ],
  providers: [
    
  ],
})
export class AppModule { }
