import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';


import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
      MatStepperModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatIconModule,
      
      MatFormFieldModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      lastName: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', {
      firstName: this.firstFormGroup.value.firstName,
      lastName: this.secondFormGroup.value.lastName,
    });
  }
}
