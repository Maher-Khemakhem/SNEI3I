import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Fixed `styleUrl` to `styleUrls` (plural)
})
export class NavComponent {
  constructor(private router: Router) { // Removed `const` and made `router` private
    console.log("NavComponent created");
  }

  login() {
    this.router.navigate(['/login']); // Accessing `router` correctly
  }
  signin() {
    this.router.navigate(['/loginclient']); // Accessing `router` correctly
  }
}
