import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { WorkerService } from '../../../services/worker.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule here

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,FormsModule,
    MatInputModule,RouterModule
  ],
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css'],
})
export class EditProfilComponent implements OnInit {
  loginService = inject(LoginService);
  workerService = inject(WorkerService);
  worker_id = localStorage.getItem('worker_id');

  // Worker data
  firstname = '';
  lastname = '';
  email = '';
  num_tel: string | null = null;
  date_of_birth: string | null = null;
  speciality = '';
  description = '';
  location = '';
  price: number | null = null;
  autre_service: string | null = null;
  photo: string | null = null;
  work_photos: { file: File | null; preview: string }[] = [];
  selectedFiles: File[] = [];

  list_localisation: string[] = [
    'Tunis',
    'Sfax',
    'Ariana',
    'Ben Arous',
    'Mannouba',
    'Bizerte',
    'Nabeul',
    'Beja',
    'Jendouba',
    'Zaghouan',
    'Siliana',
    'Le Kef',
    'Sousse',
    'Monastir',
    'Mahdia',
    'Kasserine',
    'Sidi Bouzid',
    'Kairouan',
    'Gafsa',
    'Gabes',
    'Medenine',
    'Tozeur',
    'Kebili',
    'Tataouine',
  ];

  certificationForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.certificationForm = this.fb.group({
      certifications: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.worker_id) {
      this.workerService.getWorkerbyID(this.worker_id).subscribe((res: any) => {
        this.initializeWorkerData(res);
      });
    }
  }

  private initializeWorkerData(data: any): void {
    this.firstname = data.firstname || '';
    this.lastname = data.lastname || '';
    this.num_tel = data.num_tel || null;
    this.date_of_birth = this.formatDate(data.date_of_birth);
    this.speciality = data.speciality || '';
    this.description = data.description || '';
    this.location = data.location || '';
    this.price = data.price || null;
    this.autre_service = data.autre_service || null;
    this.photo = data.photo || null;
    this.work_photos =
      data.work_photo?.map((url: string) => ({
        file: null,
        preview: url,
      })) || [];
    this.initializeCertifications(data.certification || []);
  }

  get certifications(): FormArray {
    return this.certificationForm.get('certifications') as FormArray;
  }

  private initializeCertifications(certifications: any[]): void {
    const certificationFormArray = certifications.map((cert: any) =>
      this.fb.group({
        title: [cert.title, Validators.required],
        url: [cert.url, Validators.required],
      })
    );
    this.certificationForm.setControl('certifications', this.fb.array(certificationFormArray));
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
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.work_photos.push({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  deletePhoto(index: number): void {
    this.work_photos.splice(index, 1);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    const body = {
      firstname: this.firstname,
      lastname: this.lastname,
      num_tel: this.num_tel,
      date_of_birth: this.date_of_birth,
      speciality: this.speciality,
      description: this.description,
      location: this.location,
      price: this.price,
      certification: this.certifications.value.map((cert: any) => ({
        title: cert.title,
        url: cert.url,
      })),
      autre_service: this.autre_service,
      work_photo: this.work_photos.map((photo) => photo.preview),
    };

    if (this.worker_id) {
      this.workerService.updateWorker(this.worker_id, body).subscribe(
        () => {
          alert('Worker profile updated successfully!');
          this.router.navigate(['/worker/profil']);
        },
        (error) => {
          console.error('Update error:', error);
        }
      );
    }
  }

  logout(): void {
    localStorage.clear();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  trackByIndex(index: number): number {
    return index;
  }
   gotoprofil(): void {
    
    this.router.navigate(['/worker/profil']);
  }
 
}
