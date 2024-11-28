import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APILoginResponseModel } from '../model/interface/API_Login';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }
  getdata(user: string): Observable<any> {
    const API = `http://localhost:3000/reservation/revenue/${user}`;
    return this.http.get<any>(API);
  }
}
