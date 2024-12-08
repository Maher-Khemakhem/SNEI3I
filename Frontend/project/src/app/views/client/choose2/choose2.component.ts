import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-choose2',
  standalone: true,
  imports: [],
  templateUrl: './choose2.component.html',
  styleUrl: './choose2.component.css'
})
export class Choose2Component {
   constructor(private router: Router) {}
  client(): void {
    this.router.navigate(['/signupclient']);
  }
  worker(): void {
    this.router.navigate(['/signupworker']);
  }
}
