import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../../../services/chart.service';
import { WorkerService } from '../../../services/worker.service';
import { LoginService } from '../../../services/login.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  worker_id = localStorage.getItem("worker_id") || "";
  router = inject(Router);
  workerservice = inject(WorkerService);
  chartservice = inject(ChartService);
  loginService = inject(LoginService);

  data: any = null;
  labeldata: string[] = []; // For labels (months)
  tabdata: number[] = [];  // For revenue values
  total: any = null; // Initialize as null
  monthly_revenue: any = null; // Initialize as null
  daily_revenue:any;


  constructor() {}

  ngOnInit(): void {
    this.initTotalRevenue();
    this.initMonthlyRevenue();
    this.initDailyRevenue();
    const userId = localStorage.getItem('worker_id');
  
    if (userId) {
      this.chartservice.getdata(userId).subscribe({
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
  }

  initTotalRevenue(): void {
    if (this.worker_id) {
      this.workerservice.getTotalrevenue(this.worker_id).subscribe({
        next: (response) => {
          this.total = response;
        },
        error: (error) => {
          console.error('Error fetching total revenue:', error);
        }
      });
    }
  }
   initMonthlyRevenue(): void {
    if (this.worker_id) {
      this.workerservice.getMonthlyrevenue(this.worker_id).subscribe({
        next: (response) => {
          this.monthly_revenue = response;
        },
        error: (error) => {
          console.error('Error fetching total revenue:', error);
        }
      });
    }
  }
    initDailyRevenue(): void {
    if (this.worker_id) {
      this.workerservice.getDailyrevenue(this.worker_id).subscribe({
        next: (response) => {
          this.daily_revenue = response;
        },
        error: (error) => {
          console.error('Error fetching today revenue:', error);
        }
      });
    }
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
  }
  logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.loginService.logout();

  }
  /*onClickOffre(): void {
    this.router.navigateByUrl('/worker/offre');
    console.log('Offre clicked!');
  }*/
}
