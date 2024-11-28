import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable
import { User } from '../model/class/User';
import { APILoginResponseModel } from '../model/interface/API_Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(user: User): Observable<APILoginResponseModel> {
    return this.http.post<APILoginResponseModel>("http://localhost:3000/connect/login", user);
  }
  
  
}
