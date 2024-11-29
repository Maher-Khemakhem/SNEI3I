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


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  MatIconModule,MatSelectModule,MatOptionModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    
  }
  locations = ['New York', 'San Francisco', 'Chicago', 'Los Angeles'];
  specialties = ['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology'];

  selectedLocation: string | undefined;
  selectedSpecialty: string | undefined;

  search() {
    console.log('Searching for:', {
      location: this.selectedLocation,
      specialty: this.selectedSpecialty,
    });
  }
}
