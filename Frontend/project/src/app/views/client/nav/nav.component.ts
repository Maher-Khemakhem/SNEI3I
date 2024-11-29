import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatIconModule,MatAutocompleteModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule], // Required for standalone components
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Fixed `styleUrl` to `styleUrls` (plural)
})
export class NavComponent {
  constructor(private router: Router) { // Removed `const` and made `router` private
    console.log("NavComponent created");
  }

  login() {
    this.router.navigate(['/login']); // Accessing `router` correctly
  }
  signin() {
    this.router.navigate(['/loginclient']); // Accessing `router` correctly
  }
}
