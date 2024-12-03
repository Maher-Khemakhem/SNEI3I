import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { APILoginResponseModel } from '../../../model/interface/API_Login';
import { Router } from '@angular/router'; 
import { User } from '../../../model/class/User';
@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit{
  userObj: User = new User();
  loginService = inject(LoginService);
  router = inject(Router);
  constructor(){}
  ngOnInit(): void {
      
  }
  onSubmit() {
    console.log(this.userObj);
    this.loginService.Login(this.userObj).subscribe({
      next: (response: any) => {
        if (response.user) {
          if(response.role==="admin"){
            alert("Success! You are logged in.");
            localStorage.setItem('admin_id',response.id_role);
            localStorage.setItem('user_id',response.user );
            localStorage.setItem('token',response.token||"" );
            localStorage.setItem('role',"admin" );
            this.router.navigateByUrl('/');
          }else{
            alert("Access only for admins");
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
