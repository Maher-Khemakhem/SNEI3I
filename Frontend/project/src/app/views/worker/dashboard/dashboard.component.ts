import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../../../services/chart.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  data: any = null;
  labeldata: string[] = []; // For labels (months)
  tabdata: number[] = [];  // For revenue values

  constructor(private chartservice: ChartService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
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

  initializeChart(): void {
    const ctx = document.getElementById('chart-line') as HTMLCanvasElement;
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

  onClickOffre(): void {
    this.router.navigateByUrl('/worker/offre');
    console.log('Offre clicked!');
  }
}
