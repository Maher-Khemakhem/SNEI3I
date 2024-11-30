import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { WorkerService } from '../../../services/worker.service';
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
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTooltipModule,CarouselModule, MatButtonModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule ],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {
  worker: any; // Define the worker property to hold worker data
 
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

  constructor(private workerservice:WorkerService) {}

  ngOnInit(): void {
    // Get the worker ID from localStorage
    
    const id = localStorage.getItem('filterworker_id'); // Corrected syntax
    if (id) {
      // Ensure the ID exists before making a request
      this.workerservice.getWorkerbyID(id).subscribe({
       
        next: (workerData) => {
          this.worker = workerData;
          if (workerData && Array.isArray(workerData.work_photo)) {
            // Ensure `work_photo` is an array
            this.workPhotos = workerData.work_photo;
            this.updateVisiblePhotos();
          }},
        error: (err) => {
          console.error('Error fetching worker data:', err); // Handle errors gracefully
        }
      });
    } else {
      console.error('No worker ID found in localStorage'); // Log error if ID is not found
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
