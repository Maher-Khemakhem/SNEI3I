import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const clientOrNoAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('client_id');
  const workerId = localStorage.getItem('worker_id');
  const adminId = localStorage.getItem('admin_id');
  // Check if the user is authenticated as a client or no one is authenticated
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      // If token is valid (not expired) and clientId exists, allow access
      if (!isExpired && clientId) {
        return true; // Allow access
      }
      if(!isExpired&&workerId){
        router.navigate(['/worker/dashboard']);
        return false;
      }
      if(!isExpired&&adminId){
        router.navigate(['/admin/dashboard']);
        return false;
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  return true;
  

};
