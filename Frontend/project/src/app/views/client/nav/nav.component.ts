import { Component, OnInit } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { authGuard } from '../../../services/auth.guard';
import { ClientService } from '../../../services/client.service';
import { AdminService } from '../../../services/admin.service';
import { WorkerService } from '../../../services/worker.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  userName = ''; // Dynamically set based on the fetched user
  userType = ''; // 'client', 'admin', or 'worker'
  client: any = null;
  admin: any = null;
  worker: any = null;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private adminService: AdminService,
    private workerService: WorkerService,
    private authGuard: authGuard
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.checkLoginStatus(); // Directly check the login status
    this.userType = localStorage.getItem('role') || '';
    if(this.isLoggedIn){
      this.fetchUserData();
    }
    console.log('User Logged In:', this.isLoggedIn);
    console.log('User Type:', this.userType);
  }
  private checkLoginStatus(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    }
    return false;
  }
  // Use this method to check if the user is logged in asynchronously
  

  private async fetchUserData(): Promise<void> {
    try {
      switch (this.userType) {
        case 'client':
          const clientId = localStorage.getItem('client_id');
          if (clientId) {
            this.client = await this.clientService.getClientById(clientId).toPromise();
            this.userName = this.client?.name || 'Client';
            console.log('Client:', this.client);
          }
          break;

        case 'admin':
          const adminId = localStorage.getItem('admin_id');
          if (adminId) {
            this.admin = await this.adminService.getAdminById(adminId).toPromise();
            this.userName = this.admin?.name || 'Admin';
            console.log('Admin:', this.admin);
          }
          break;

        case 'worker':
          const workerId = localStorage.getItem('worker_id');
          if (workerId) {
            this.worker = await this.workerService.getWorkerbyID(workerId).toPromise();
            this.userName = this.worker?.name || 'Worker';
            console.log('Worker:', this.worker);
          }
          break;

        default:
          console.warn('Unknown user type:', this.userType);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  login(): void {
    this.router.navigate(['/choose2']);
  }

  signin(): void {
    this.router.navigate(['/choose']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);
    console.log('User logged out');
  }

  goToProfile(): void {
    switch (this.userType) {
      case 'client':
        this.router.navigate(['/client-profile']);
        break;

      case 'admin':
        this.router.navigate(['/admin-profile']);
        break;

      case 'worker':
        this.router.navigate(['/worker-profile']);
        break;

      default:
        console.warn('No profile route defined for user type:', this.userType);
    }
  }
  goTodashboard(){
    this.router.navigate(['/worker/dashboard']);
  }
}
