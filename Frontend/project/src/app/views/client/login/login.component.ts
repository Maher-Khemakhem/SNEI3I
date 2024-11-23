import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);

  // Define the form groups and form controls
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isLinear = true;

  constructor() {
    // Initialize the form groups with controls
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required] // This should match the formControlName in the template
    });

    this.secondFormGroup = this._formBuilder.group({
      lastName: ['', Validators.required] // This should match the formControlName in the template
    });
  }

  // onSubmit method, to handle the form submission
  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      console.log('Form Submitted', this.firstFormGroup.value, this.secondFormGroup.value);
    }
  }
}
