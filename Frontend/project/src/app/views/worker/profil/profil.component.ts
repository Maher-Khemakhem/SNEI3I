import { Component, inject } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { LoginService } from '../../../services/login.service';

import { CommonModule } from '@angular/common'; // Required for standalone components
;
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
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-profil',
  standalone: true,
imports: [CommonModule, MatTabsModule, MatTooltipModule,CarouselModule, MatButtonModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule ],  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  loginService = inject(LoginService);
carouselOptions=   {};
visiblePhotos: any;

 logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
      localStorage.removeItem("token");
    this.loginService.logout();
  }
}
