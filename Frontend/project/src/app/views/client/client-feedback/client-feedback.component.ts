import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-client-feedback',
  standalone: true,
  imports: [],
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})


export class ClientFeedbackComponent {
  feedbacks = [
    {
      name: 'John Doe',
      role: 'CEO at CompanyX',
      comment: 'This service is exceptional! Highly recommended.',
      rating: 5
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Manager at StartupY',
      comment: 'Great experience, professional team, and excellent results.',
      rating: 4.5
    },
    {
      name: 'Alice Johnson',
      role: 'Freelancer',
      comment: 'The best investment I have made for my business.',
      rating: 4
    }
  ];
}
