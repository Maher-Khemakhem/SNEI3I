import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { WorkerService } from '../../../services/worker.service';
import { MatCardModule } from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
} from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

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
  selector: 'app-worker-works-photo',
  standalone: true,
  imports: [CommonModule,
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
    CarouselModule,], // Required for standalone components
  templateUrl: './worker-works-photo.component.html',
  styleUrl: './worker-works-photo.component.css'
})
export class WorkerWorksPhotoComponent implements OnInit {

  worker: any;
  workPhotos: any[] = [];
  visiblePhotos: any[] = [];
  startIndex = 0;
  photosToShow = 3;
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

  constructor(private workerservice: WorkerService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('filterworker_id');
    if (id) {
      this.workerservice.getWorkerbyID(id).subscribe({
        next: (workerData) => {
          this.worker = workerData;
          if (workerData && Array.isArray(workerData.work_photo)) {
            // Ensure `work_photo` is an array
            this.workPhotos = workerData.work_photo;
            this.updateVisiblePhotos();
          } else {
            console.warn('No work photos available or work_photo is not an array.');
          }
        },
        error: (err) => {
          console.error('Error fetching worker data:', err);
        },
      });
    } else {
      console.error('No worker ID found in localStorage');
    }
  }
  updateVisiblePhotos() {
    this.visiblePhotos = this.workPhotos.slice(
      this.startIndex,
      this.startIndex + this.photosToShow
    );
  }

  next() {
    if (this.startIndex + this.photosToShow < this.workPhotos.length) {
      this.startIndex++;
      this.updateVisiblePhotos();
    }
  }

  prev() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.updateVisiblePhotos();
    }
  }
}