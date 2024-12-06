import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { ClientService } from '../../../services/client.service';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../../../services/chart.service';
import { ReservationService } from '../../../services/reservation.service';
Chart.register(...registerables);
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

  data: any = null;
  labeldata: string[] = []; // For labels (months)
  tabdata: number[] = [];  // For revenue values
  total: any = null; // Initialize as null
  monthly_revenue: any = null; // Initialize as null
  daily_revenue:any;
  reservations:any;
  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private workerService: WorkerService, 
    private clientService: ClientService,
    private chartservice:ChartService,
    private reservationservice:ReservationService
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

    
  
    
      
      this.reservationservice.getMonthReservation().subscribe({
        next: (response) => {
          console.log('Chart data loaded:', response);
          this.data = response;

        // Populate labels and data arrays
          if (this.data && this.data.revenue) {
            this.labeldata = this.data.revenue.map((item: any) => item.month);
            this.tabdata = this.data.revenue.map((item: any) => item.totalRevenue);
          }

        // Initialize the chart
          this.initializeChart();
        },
        error: (error) => {
          console.error('Error fetching chart data:', error);
        }
      });
    

  }
  initializeChart(): void {
    const ctx = document.getElementById('chart-line') as HTMLCanvasElement;
    console.log(this.labeldata);
    console.log(this.tabdata);
    if (!ctx || !this.labeldata.length || !this.tabdata.length) {
      console.error('Unable to initialize chart: Missing data or canvas element.');
      return;
    }

    new Chart(ctx, {
      type: 'bar', // Change type to 'line' for a line chart
      data: {
        labels: this.labeldata, // Dynamic month labels
        datasets: [
          {
            label: 'Monthly Revenue',
            data: this.tabdata, // Dynamic revenue data
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(231, 74, 59, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(231, 74, 59, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(231, 74, 59, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(231, 74, 59, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    /*
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labeldata, // Dynamic labels
        datasets: [
          {
            label: 'Revenue Data',
            data: this.tabdata, // Dynamic revenue data
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    */
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
