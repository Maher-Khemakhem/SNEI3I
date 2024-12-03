import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SearchService } from '.././../../services/search.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule, CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  locations: any[] = [];
  specialties:  any[] = [];
  selectedLocation: string | undefined;
  selectedSpecialty: string | undefined;
  filterForm: FormGroup;
  obj:any;
  
 

  constructor(private fb: FormBuilder,private searchService: SearchService,private router:Router) {
    this.filterForm = this.fb.group({
      location: [''], // Default value is empty
 
      speciality:['']    
    });
  }

  ngOnInit(): void {
    this.fetchLocations();
    this.fetchSpecialties();
  }

  fetchLocations(): void {
    this.searchService.getLocations().subscribe({
      next: (data) => {
        this.locations = data.locations;
        console.log(this.locations); 
         // Assuming `data` is an array of strings.
      },
      error: (error) => {
        console.error('Failed to fetch locations:', error);
      },
      complete: () => {
        console.log('Locations fetched successfully');
      },
    });
  }
  
  fetchSpecialties(): void {
    this.searchService.getSepcialities().subscribe({
      next: (data) => {
        this.specialties = data.specialities; // Assuming `data` is an array of strings.
      },
      error: (error) => {
        console.error('Failed to fetch specialties:', error);
      },
      complete: () => {
        console.log('Specialties fetched successfully');
      },
    });
  }
  

  search(): void {
    this.obj = {
      location: this.selectedLocation,
      speciality: this.selectedSpecialty,
    }
    localStorage.setItem("obj", JSON.stringify(this.obj));
    this.router.navigate(['/filter']);
    
    console.log('Searching for:', {
      location: this.selectedLocation,
      specialty: this.selectedSpecialty,
    });
  }
}
