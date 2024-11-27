import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, ChartConfiguration, ChartType } from 'chart.js';

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
  
  // Chart options
  public barChartOptions: ChartConfiguration['options'] = {
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
  };

  // Chart type
  public barChartType: ChartType = 'bar';

  // Chart data
  public barChartData: ChartConfiguration['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Sales Data',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      },
      {
        data: [28, 48, 40, 19, 86],
        label: 'Revenue Data',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {
    
    // You can perform additional setup here if needed
  }

  onClickOffre(): void {
    this.router.navigateByUrl('/worker/offre');
    console.log('Offre clicked!');
  }
}
