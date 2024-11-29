import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../../../services/search.service';
@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatSelectModule,MatButtonModule], // Import CommonModule here
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})
export class FiltreComponent implements OnInit {
  workers: any[] = []; // All workers
  filteredWorkers: any[] = []; // Workers displayed after filtering
  locations: any[] = []; // List of types
  prices: any[] = []; // List of categories
  specialities: any[] = [];
  filterForm: FormGroup; // Form for filtering
  obj:any;
  constructor(private fb: FormBuilder, private workerService: WorkerService,private router:Router,private searchservice:SearchService) {
    // Initialize the form
    this.filterForm = this.fb.group({
      location: [''], // Default value is empty
      price: [''],
      speciality:['']    
    });
  }

  ngOnInit(): void {
    // Fetch initial data
    this.workerService.getAllworkers().subscribe((data) => {
      this.workers = data;
      this.obj = JSON.parse(localStorage.getItem('obj') || '{}'); 
      this.filterForm = this.fb.group({
        location: [this.obj.location,''], // Default value is empty
        price: [''],
        speciality:[this.obj.speciality,'']    
      });
      console.log(this.obj.location, this.obj.speciality); 
      this.filteredWorkers = this.workers.filter((worker) => {
      const matchesPrice = !this.obj.location||worker.location==this.obj.location;
      const matchesLocation = !this.obj.speciality||worker.speciality==this.obj.speciality;
      return matchesPrice && matchesLocation;
      
    }); 
    console.log(this.workers);
    console.log(this.filteredWorkers);
      //this.filteredWorkers = data; // Initially, show all workers
    });

    // Fetch types and categories (mock these APIs if necessary)
    /*
    this.workerService.getLocation().subscribe((data) => {
      this.locations = data;
    });

    this.workerService.getPrice().subscribe((data) => {
      this.prices = data;
    });
    */
    this.searchservice.getLocations().subscribe((data:any) => {
      this.locations = data.locations;
    });
    this.searchservice.getPrices().subscribe((data:any) => {
      this.prices = data.prices;
    });
    this.searchservice.getSepcialities().subscribe((data:any) => {
      this.specialities = data.specialities;
    });
    
    
  }

  // Filter workers based on form values
  onFilterSubmit(): void {
    const { price, location,speciality } = this.filterForm.value;

    this.filteredWorkers = this.workers.filter((worker) => {
      const matchesPrice = !price || worker.price === price;
      const matchesLocation = !location || worker.location === location;
      const matchesSpeciality = !speciality || worker.speciality === speciality;
      console.log(price);
      return matchesPrice || matchesLocation || matchesSpeciality;
      
    });
    
    console.log('Filtered Workers:', this.filteredWorkers);
  }
  gotoworker(id:any){
    localStorage.setItem('filterworker_id',id);
    this.router.navigateByUrl('/workerprofile')
  }
  

  
}
