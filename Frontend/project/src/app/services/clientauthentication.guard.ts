import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const clientauthenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('client_id');

  if (token && clientId) {
    try {
      // Decode and validate token
      const decodedToken: any = jwtDecode(token);

      // Check if the token is expired
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (!isExpired) {
        return true;
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  // Redirect to login if not authenticated
  router.navigate(['/']);
  return false;
};
