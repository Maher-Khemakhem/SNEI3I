import { Component, inject, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { LoginService } from '../../../services/login.service';

import { CommonModule } from '@angular/common'; // Required for standalone components
;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-profil',
  standalone: true,
imports: [CommonModule, MatTabsModule, MatTooltipModule,CarouselModule, MatButtonModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule ],  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  
  loginService = inject(LoginService);
  workerService = inject(WorkerService);

   worker_id = localStorage.getItem('worker_id');
  firstname = '';
  lastname = '';
  email = '';
  num_tel: string | null = null;
  date_of_birth: string | null = null;
  speciality = '';
  description = '';
  location = '';
  price: number | null = null;
  certification: string | null = null;
  autre_service: string | null = null;
  photo: string | null = null;
  work_photos: string[] = []; // Array to store photo URLs or Base64 strings
  selectedFiles: File[] = []; // Temporarily stores selected files
  number_of_messages:any;

  carouselOptions=   {};
  visiblePhotos: any;

 logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
      localStorage.removeItem("token");
    this.loginService.logout();
  }

  ngOnInit(): void {
    if (this.worker_id) {
      this.workerService.getWorkerbyID(this.worker_id).subscribe((res: any) => {
        this.firstname = res.firstname || '';
        this.email = res.email;
        this.lastname = res.lastname || '';
        this.num_tel = res.num_tel || null;
        this.date_of_birth = this.formatDate(res.date_of_birth);
        this.speciality = res.speciality || '';
        this.description = res.description || '';
        this.location = res.location || '';
        this.price = res.price || null;
        this.certification = res.certification || null;
        this.autre_service = res.autre_service || null;
        this.photo = res.photo || null;
        this.work_photos = res.work_photo || [];
        this.number_of_messages = res.number_of_messages;
        alert(this.work_photos);
      });
    }
  }
    // Helper function to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
