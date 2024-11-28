import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from "../../views/worker/nav/nav.component";
import { FooterComponent } from "../../views/worker/footer/footer.component";
import { DashboardComponent } from '../../views/worker/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavComponent, 
    FooterComponent, 
    DashboardComponent, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.css'
})
export class WorkerLayoutComponent   {
  router = inject(Router);

}