import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SignupClientService } from '../../../service/signup-client.service';
//import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class LoginComponent implements OnInit{
  private _formBuilder = inject(FormBuilder);

  firstFormGroup!: FormGroup; // Ensure proper typing
  secondFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  isLinear = true;
  photo: string | null = null;

  constructor(private loginservice: SignupClientService) {}

  ngOnInit() {
    this.initializeFormGroups();
   
     
  }

  // Initialize form groups
  private initializeFormGroups(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncEmailValidator()],
      ],
    });

    this.secondFormGroup = this._formBuilder.group({
      Date_of_birth: ['', Validators.required],
      num_tel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ],
    });

    this.passwordFormGroup = this._formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Password match validator
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handle photo upload
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

  // Handle form submission
  async onSubmit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.passwordFormGroup.valid
    ) {
      await this.mockApiRequest();

      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.passwordFormGroup.value,
        photo: this.photo || 'Default photo URL or message',
      };
      /*
      this.loginservice.addClient(formData,"client").subscribe(() => {
        console.log('Form Submitted Successfully!');
      });
      */
      console.log('Form Data:', formData);
    } else {
      console.error('Form is invalid!');
    }
  }

  // Simulated async validator for email
  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return of(control.value).pipe(
        delay(1000),
        map((email) => {
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
      }, 1500);
    });
  }
}
