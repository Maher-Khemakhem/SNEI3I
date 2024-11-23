import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);

  // Define the form groups and form controls
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  isLinear = true;
  photo: string | null = null;

  constructor() {
    // Initialize the form groups with controls
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required], // Matches formControlName in the template
      lastname: ['', Validators.required], // Matches formControlName in the template
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncEmailValidator()], // Add Async Validator
      ], // Matches formControlName in the template
    });

    this.secondFormGroup = this._formBuilder.group({
      dob: ['', Validators.required], // This should match the formControlName in the template
      numtel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ], // This should match the formControlName in the template
    });

    this.passwordFormGroup = this._formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // onSubmit method, to handle the form submission
  async onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // Simulate an async operation before submission
      await this.mockApiRequest();
      console.log('Form Submitted', this.firstFormGroup.value, this.secondFormGroup.value);
    }
  }

  // Simulate async validator for email
  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return of(control.value).pipe(
        delay(1000), // Simulate an API call delay
        map((email) => {
          // Example: Mark as invalid if email contains 'invalid'
          return email.includes('invalid') ? { emailTaken: true } : null;
        })
      );
    };
  }

  // Simulated API request for form submission
  private mockApiRequest(): Promise<void> {
    return new Promise((resolve) => {
      console.log('Simulating API request...');
      setTimeout(() => {
        console.log('API request completed');
        resolve();
      }, 1500); // Simulated delay
    });
  }
}
