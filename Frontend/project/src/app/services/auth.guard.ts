import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

<<<<<<< HEAD
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
=======
export const authGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user_id');
  const router = inject(Router);
  if(localUser != null){
    return true
  }else{
    router.navigateByUrl('/');
    return false;
>>>>>>> edd4111d284d43d360996c1934a3536c2fbc3fe0
  }
}
