import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { WorkerService } from '../../../services/worker.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-worker-works-photo',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './worker-works-photo.component.html',
  styleUrl: './worker-works-photo.component.css'
})
export class WorkerWorksPhotoComponent implements OnInit {
  worker: any; // Define the worker property to hold worker data

  constructor(private workerservice:WorkerService) {
    this.updateVisiblePhotos();
  }

  ngOnInit(): void {
    // Get the worker ID from localStorage
    const id = localStorage.getItem('filterworker_id'); // Corrected syntax
    if (id) {
      // Ensure the ID exists before making a request
      this.workerservice.getWorkerbyID(id).subscribe({
        next: (workerData) => {
          this.worker = workerData; // Assign worker data to the component property
          console.log('Worker data:', workerData); // Debugging log
        },
        error: (err) => {
          console.error('Error fetching worker data:', err); // Handle errors gracefully
        }
      });
    } else {
      console.error('No worker ID found in localStorage'); // Log error if ID is not found
    }
  }
  photos = [
    { url: 'https://via.placeholder.com/150', alt: 'Photo 1' },
    { url: 'https://via.placeholder.com/150', alt: 'Photo 2' },
    { url: 'https://via.placeholder.com/150', alt: 'Photo 3' },
    { url: 'https://via.placeholder.com/150', alt: 'Photo 4' },
    { url: 'https://via.placeholder.com/150', alt: 'Photo 5' },
  ];

  visiblePhotos: any[] = [];
  startIndex = 0;
  photosToShow = 3;

  
  

  updateVisiblePhotos() {
    this.visiblePhotos = this.photos.slice(
      this.startIndex,
      this.startIndex + this.photosToShow
    );
  }

  next() {
    if (this.startIndex + this.photosToShow < this.photos.length) {
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
