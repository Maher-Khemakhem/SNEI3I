import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      // Replace this with your actual authentication check
      const token = localStorage.getItem('token'); // Example: check for a token

      if (token) {
        try {
          // Decode and validate token
          const decodedToken: any = jwtDecode(token);
  
          // Check if the token is expired
          const isExpired = decodedToken.exp * 1000 < Date.now();
          if (!isExpired) {
            this.router.navigate(['/']);
            console.log('redirected');
            resolve(false); // Deny access if token is expired
          } else {
            resolve(true); // Allow access if token is valid
          }
        } catch (error) {
          console.error('Invalid token:', error);
          resolve(false); // Deny access if token is invalid
        }
      } else {
        resolve(false); // Deny access if there is no token
      }
    });
  }
}