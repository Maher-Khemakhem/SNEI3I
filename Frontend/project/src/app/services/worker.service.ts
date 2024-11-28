import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_offres } from '../model/interface/API';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private REST_API = 'http://localhost:3000/worker'; // API base URL

  constructor(private http: HttpClient) {}

  getOffers(worker_id: string): Observable<API_offres> {
    return this.http.get<API_offres>(`${this.REST_API}/offre/${worker_id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching offers:', error);
        return throwError(() => new Error('Failed to fetch offers. Please try again.'));
      })
    );
  }
   getReservation(worker_id: string): Observable<API_offres> {
    return this.http.get<API_offres>(`${this.REST_API}/reservation/${worker_id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching offers:', error);
        return throwError(() => new Error('Failed to fetch offers. Please try again.'));
      })
    );
  }

  getWorkerbyID(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/${id}`; // Build the dynamic API URL
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching worker by ID:', error);
        return throwError(() => new Error('Failed to fetch worker by ID. Please try again.'));
      })
    );
  }

  getAllworkers(): Observable<any> {
    const API_URL = this.REST_API; // Use the base API URL
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching all workers:', error);
        return throwError(() => new Error('Failed to fetch all workers. Please try again.'));
      })
    );
  }
}
