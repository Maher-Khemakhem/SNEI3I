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
  this.loginService.Login(this.userObj).subscribe({
    next: (response: APILoginResponseModel) => {
      if (response.user) {
        alert("Success! You are logged in.");
        localStorage.setItem('user_id',response.user );
      } else if (response.errors) {
        // More specific error handling for errors in response
        const errorMessage = 
          response.errors.password || 
          response.errors.email || 
          'Login failed';
        alert(errorMessage);
      }
    },
    error: (httpError) => {
       
      // Handle HTTP errors returned from the server
      if (httpError.error && typeof httpError.error === 'object') {
        // Access the JSON error response
        const errorResponse = httpError.error;
        // General error message
        const generalMessage = errorResponse.message || 'An unknown error occurred.';
        // Access specific fields from the JSON, if available
        const emailError = errorResponse.errors?.email;
        const passwordError = errorResponse.errors?.password;
        // Display error messages
        let errorMessage = ``;
        if (emailError) {
          errorMessage += `Email Error: ${emailError}\n`;
        }
        if (passwordError) {
          errorMessage += `Password Error: ${passwordError}\n`;
        }
        alert(errorMessage);
      } else {
        // Handle non-JSON errors (e.g., connection failures)
        alert('Connection error. Please try again.');
      }

    }
  });
}


}
