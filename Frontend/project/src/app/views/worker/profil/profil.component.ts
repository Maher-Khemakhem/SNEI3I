import { Component, inject, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
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

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTooltipModule, CarouselModule, MatButtonModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule ,RouterModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  loginService = inject(LoginService);
  workerService = inject(WorkerService);
  router = inject(Router);

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
  certification: any;
  autre_service: any;
  photo: any;
  work_photos: any[] = [];
  number_of_messages: any;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };

  startIndex: number = 0;
  photosToShow: number = 5;
  visiblePhotos: any;

  logout(): void {
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
   goToEditProfil(): void {
    
    this.router.navigate(['worker/editprofil']);
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
        this.work_photos = Array.isArray(res.work_photo) ? res.work_photo.slice(this.startIndex, this.startIndex + this.photosToShow) : [];
        this.number_of_messages = res.number_of_messages;
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
