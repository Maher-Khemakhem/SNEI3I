import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { WorkerService } from '../../../services/worker.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-worker-works-photo',
  standalone: true,
  imports: [MatCardModule, CommonModule], // Required for standalone components
  templateUrl: './worker-works-photo.component.html',
  styleUrl: './worker-works-photo.component.css'
})
export class WorkerWorksPhotoComponent implements OnInit {
  worker: any;
  workPhotos: any[] = [];
  visiblePhotos: any[] = [];
  startIndex = 0;
  photosToShow = 3;

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