import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

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

  constructor() {}

  ngOnInit(): void {
    // Initialize the chart when the component is loaded
    const ctx = document.getElementById('chart-line') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Line chart
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels
        datasets: [
          {
            label: 'Sales Data',
            data: [65, 59, 80, 81, 56],
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            fill: false // No filled surface under the line
          },
          {
            label: 'Revenue Data',
            data: [28, 48, 40, 19, 86],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false // No filled surface under the line
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
