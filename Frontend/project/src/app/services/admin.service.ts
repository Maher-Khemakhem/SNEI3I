import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private REST_API = 'http://localhost:3000/admin'; // API base URL

  constructor(private http:HttpClient) { }

  getAllAdmins(): Observable<any> {
    return this.http.get<any>(this.REST_API).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching admins:', error);
        return throwError(() => new Error('Failed to fetch admins. Please try again.'));
      })
    );
  }
  updateAdmin(id:any,data:any): Observable<any> {
    const API = `${this.REST_API}/${id}`;
    return this.http.put<any>(API,data).pipe(
      catchError((error) => {
        console.error('Error occurred while updating admin:', error);
        return throwError(() => new Error('Failed to update admin. Please try again.'));
      })
    );
  }
  deleteAdmin(id: any): Observable<any> {
    const API = `${this.REST_API}/${id}`; // assuming the API follows this pattern
    return this.http.delete<any>(API).pipe(
      catchError((error) => {
        console.error('Error deleting admin:', error);
        return throwError(error); // Ensure the error is thrown so it can be handled upstream
      })
    );
  }
  getAdminById(id:any): Observable<any> {
    const API = `${this.REST_API}/${id}`;
    return this.http.get<any>(API);
  }
  createAdmin(data:any): Observable<any> {
    const API = `${this.REST_API}`;
    return this.http.post<any>(API,data);
  }
}
