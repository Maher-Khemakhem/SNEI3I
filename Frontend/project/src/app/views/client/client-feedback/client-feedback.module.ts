import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFeedbackComponent } from './client-feedback.component';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
   
    ClientFeedbackComponent
  ],

  exports: [ClientFeedbackComponent]
})
export class ClientFeedbackModule { }
