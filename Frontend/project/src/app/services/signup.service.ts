import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignupService {


  private REST_API = 'http://localhost:3000/connect/signup'; // API base URL

  // Default headers
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  /**
   * Adds a new client with a specific role.
   * @param data - The signup data (JSON object)
   * @param role - The user role (e.g., 'admin', 'user')
   * @returns An Observable with the server response
   */
  addClient(data: any, role: string): Observable<any> {
    const API_URL = `${this.REST_API}/${role}`; // Build the dynamic API URL
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError((error) => {
        console.error('Error occurred during signup:', error);
        return throwError(() => new Error('Failed to add client. Please try again.'));
      })
    );
  }
}
