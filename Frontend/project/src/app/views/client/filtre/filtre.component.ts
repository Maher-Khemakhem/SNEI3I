import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule], // Import CommonModule here
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})
export class FiltreComponent implements OnInit {
  workers: any[] = []; // Property to store the list of workers

  constructor(private workerservice:WorkerService,private router: Router) {}

  ngOnInit(): void {
    this.workerservice.getAllworkers().subscribe(
      (data) => {
        this.workers = data; // Assign the fetched data to the `workers` property
        console.log(this.workers); // Debug log to verify data
      },
      (error) => {
        console.error('Error fetching workers:', error); // Handle errors gracefully
      }
    );
  }
  gotoworker(id:any){
    localStorage.setItem('filterworker_id',id);
    this.router.navigateByUrl('/workerprofile')
  }
}
