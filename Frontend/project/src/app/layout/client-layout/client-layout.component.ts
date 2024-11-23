import { Component, inject } from '@angular/core';
import { NavComponent } from "../../views/client/nav/nav.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../views/client/footer/footer.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent,
    
    MatIconModule,MatCardModule,MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {
  constructor() {
    console.log("ClientLayoutComponent created");
  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
