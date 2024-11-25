
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SignupService } from '../../../services/signup.service';
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-sign-up-worker',
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
    MatNativeDateModule,MatOptionModule,MatSelectModule ,
    CarouselModule
   
  ],
  templateUrl: './sign-up-worker.component.html',
  styleUrl: './sign-up-worker.component.css'
  
})

export class SignUpWorkerComponent implements OnInit{
  private _formBuilder = inject(FormBuilder);

  firstFormGroup!: FormGroup; // Ensure proper typing
  secondFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;
  photos: { file: File; preview: string }[] = [];
  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  specialities = ['Software Development', 'Design', 'Marketing', 'Data Analysis'];


  isLinear = true;
  photo: string | null = null;

  constructor(private signupService:SignupService,private fb: FormBuilder) {}

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
      Date_of_birth: ['', Validators.required],
      num_tel: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,15}$/)],
      ],
    });

    this.secondFormGroup = this.fb.group({
      speciality: ['', Validators.required],
      customSpeciality: [''],
      description: ['', Validators.required],
      certifications: this.fb.array([]),
    });

    this.passwordFormGroup = this._formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  get certifications(): FormArray {
    return this.secondFormGroup.get('certifications') as FormArray;
  }

  addCertification(): void {
    this.certifications.push(
      this.fb.group({
        title: ['', Validators.required],
        url: ['', Validators.required],
      })
    );
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFiles = Array.from(target.files);
      const totalFiles = this.photos.length + selectedFiles.length;

      if (totalFiles <= 5) {
        selectedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.photos.push({ file, preview: e.target.result });
          };
          reader.readAsDataURL(file);
        });
      } else {
        alert('You can upload a maximum of 5 photos.');
      }
    }
  }

  removePhoto(index: number): void {
    this.photos.splice(index, 1);
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
  
      // Extract necessary values
      const { confirmPassword, ...passwordGroupValues } = this.passwordFormGroup.value;
  
      // Construct formData in the desired order
      const formData = {
        firstname: this.firstFormGroup.value.firstname,
        lastname: this.firstFormGroup.value.lastname,
        password: passwordGroupValues.password,
        email: this.firstFormGroup.value.email,
        num_tel: this.secondFormGroup.value.num_tel,
        Date_of_birth: this.secondFormGroup.value.Date_of_birth,
        photo: this.photo || 'Default photo URL or message',
      };
  
      this.signupService.addClient(formData, "client").subscribe(() => {
        console.log('Form Submitted Successfully!');
      });
  
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
