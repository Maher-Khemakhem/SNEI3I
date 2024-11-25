import { Component, inject } from '@angular/core';
import { User } from '../../../model/class/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { APILoginResponseModel } from '../../../model/interface/API_Login';
import { Router } from '@angular/router';  // If you want to navigate after successful login

@Component({
  selector: 'app-log-in-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in-client.component.html',
  styleUrls: ['./log-in-client.component.css']  // Corrected to `styleUrls` instead of `styleUrl`
})
export class LogInClientComponent {
  userObj: User = new User();
  loginService = inject(LoginService);
  router = inject(Router);  

  onSubmit() {
   

    // Call the Login method from LoginService
    this.loginService.Login(this.userObj).subscribe(
      (response: APILoginResponseModel) => {
        
        if (response.user) {
          
          /*this.router.navigate(['/dashboard']);*/  
          alert('Login successful');
        } else {
          // Handle validation errors or failed login
          alert('Login failed: ' + response.errors);
        }
      },
      (error) => {
        // Handle error (e.g., network issue)
        console.error('Login failed with error: ', error);
        alert('An error occurred while logging in');
      }
    );
  }
}
