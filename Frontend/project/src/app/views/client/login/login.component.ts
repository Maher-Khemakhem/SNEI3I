import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usernameFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize Form Groups
    this.usernameFormGroup = this.fb.group({
      username: ['', Validators.required],
    });

    this.passwordFormGroup = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.usernameFormGroup.valid && this.passwordFormGroup.valid) {
      const username = this.usernameFormGroup.get('username')?.value;
      const password = this.passwordFormGroup.get('password')?.value;
      console.log('Username:', username);
      console.log('Password:', password);

      // Perform login logic here
      alert('Login Successful!');
    } else {
      alert('Please complete all steps.');
    }
  }
}
