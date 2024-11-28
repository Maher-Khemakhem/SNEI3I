import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { WorkerService } from '../../../services/worker.service';


@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {
  worker: any; // Define the worker property to hold worker data

  constructor(private workerservice:WorkerService) {}

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
}
