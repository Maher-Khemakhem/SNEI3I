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
        alert("secces login")
      } else if (response.errors) {
        // More specific error handling
        const errorMessage = 
          response.errors.password || 
          response.errors.email || 
          'Login failed';
        alert(errorMessage);
      }
    },
    error: (httpError) => {
      console.log("dddddddd");
      alert('Connection error. Please try again.');
    }
  });
}
}
