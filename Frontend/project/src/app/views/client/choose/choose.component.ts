import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-choose',
  standalone: true,
  imports: [],
  templateUrl: './choose.component.html',
  styleUrl: './choose.component.css'
})
export class ChooseComponent {
  constructor(private router: Router) {}
  client(): void {
    this.router.navigate(['/loginclient']);
  }
  worker(): void {
    this.router.navigate(['/loginworker']);
  }
}
