import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../../../services/search.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})
export class FiltreComponent implements OnInit {
  workers: any[] = [];
  filteredWorkers: any[] = [];
  locations: any[] = [];
  prices: any[] = [];
  specialities: any[] = [];
  filterForm: FormGroup;
  obj: any;

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService,
    private router: Router,
    private searchservice: SearchService
  ) {
    this.filterForm = this.fb.group({
      location: [''],
      price: [''],
      speciality: ['']
    });
  }

  ngOnInit(): void {
    // Fetch initial data for workers
    this.workerService.getAllworkers().subscribe((data) => {
      this.workers = data;
      this.obj = JSON.parse(localStorage.getItem('obj') || '{}'); 

      // Set initial filter form values based on localStorage or default
      this.filterForm = this.fb.group({
        location: [this.obj.location || ''],
        price: [this.obj.price || ''],
        speciality: [this.obj.speciality || '']
      });

      console.log('LocalStorage Data:', this.obj);

      // Apply filters based on localStorage data
      this.filteredWorkers = this.workers.filter((worker) => {
        const matchesLocation = !this.obj.location || worker.location === this.obj.location;
        const matchesSpeciality = !this.obj.speciality || worker.speciality === this.obj.speciality;
        return matchesLocation && matchesSpeciality;
      });

      console.log('All Workers:', this.workers);
      console.log('Filtered Workers:', this.filteredWorkers);
    });

    // Fetch types, prices, and specialities from search service
    this.searchservice.getLocations().subscribe((data: any) => {
      this.locations = data.locations;
    });
    this.searchservice.getPrices().subscribe((data: any) => {
      this.prices = data.prices;
    });
    this.searchservice.getSepcialities().subscribe((data: any) => {
      this.specialities = data.specialities;
    });
  }

  // Filter workers based on form values
  onFilterSubmit(): void {
    const { price, location, speciality } = this.filterForm.value;

    console.log('Filter Values:', price, location, speciality);

    this.filteredWorkers = this.workers.filter((worker) => {
      const matchesPrice = !price || worker.price === price;
      const matchesLocation = !location || worker.location === location;
      const matchesSpeciality = !speciality || worker.speciality === speciality;

      return matchesPrice && matchesLocation && matchesSpeciality;
    });

    console.log('Filtered Workers:', this.filteredWorkers);
  }

  // Navigate to worker profile
  gotoworker(id: any): void {
    localStorage.setItem('filterworker_id', id);
    this.router.navigateByUrl('/workerprofile');
  }
}
