import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Replace this with your actual authentication check
    const isAuthenticated = !!localStorage.getItem('token'); // Example: check for a token

    if (isAuthenticated) {
      // Redirect to the home page (or another page) if the user is logged in
      this.router.navigate(['/']);
      return false;
    }

    // Allow access if the user is not logged in
    return true;
  }
}