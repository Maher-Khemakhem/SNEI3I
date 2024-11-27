import { Component, inject } from '@angular/core';
import { User } from '../../../model/class/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { APILoginResponseModel } from '../../../model/interface/API_Login';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-log-in-worker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in-worker.component.html',
  styleUrl: './log-in-worker.component.css'
})
export class LogInWorkerComponent {
  userObj: User = new User();
  loginService = inject(LoginService);
  router = inject(Router);  
onSubmit() {
  this.loginService.Login(this.userObj).subscribe({
    next: (response: APILoginResponseModel) => {
      if (response.user) {
        if(response.role==="worker"){
          alert("Success! You are logged in.");
          localStorage.setItem('user_id',response.user );
          localStorage.setItem('token',response.token||"" );
          this.router.navigateByUrl('/');
        }else{
          alert("Access only for workers");
        }
        
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
