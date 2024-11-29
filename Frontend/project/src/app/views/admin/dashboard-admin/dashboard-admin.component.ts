import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  nbworkers: number = 0;
  nbclients: number = 0;
  nb: number = 0;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private workerService: WorkerService, 
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Fetch number of workers
    this.workerService.getAllworkers().subscribe({
      next: (data: any) => {
        this.nbworkers = data.length;
        this.nb += this.nbworkers;
        console.log('Number of workers:', this.nbworkers);
      },
      error: (err) => {
        console.error('Error fetching workers:', err);
      }
    });

    // Fetch number of clients
    this.clientService.getAllClients().subscribe({
      next: (data: any) => {
        this.nbclients = data.length;
        this.nb += this.nbclients;
        console.log('Number of clients:', this.nbclients);
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }
  gotodashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  gotogereradmin(){
    this.router.navigate(['/admin/gerer-admin']);
  }
  gotoclient(){
    this.router.navigate(['/admin/gerer-client']);
  }
  gotoworker(){
    this.router.navigate(['/admin/gerer-worker']);
  }
  logout() {
    // Remove stored data
    localStorage.removeItem('admin_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');

    // Perform logout action from service
    this.loginService.logout();

    // Display alert
    alert('You have been logged out successfully.');

    // Navigate to the homepage or login page
    this.router.navigate(['/']);
  }
}
