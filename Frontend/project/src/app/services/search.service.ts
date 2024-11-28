import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private search_API = 'http://localhost:3000/search';
  constructor(private http: HttpClient) { }


  getWorkersByPriceAndLocation(price:any,location:any): Observable<any> {
    const API_URL = `${this.search_API}/${price}/${location}`;; 
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching all workers:', error);
        return throwError(() => new Error('Failed to fetch all workers. Please try again.'));
      })
    );
  }
  getLocations(): Observable<any> {
    const API_URL = `${this.search_API}/location`;
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching all workers:', error);
        return throwError(() => new Error('Failed to fetch all workers. Please try again.'));
      })
    );
  }
  getPrices(): Observable<any> {
    const API_URL = `${this.search_API}/price`;
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching all workers:', error);
        return throwError(() => new Error('Failed to fetch all workers. Please try again.'));
      })
    );
  }
  
  getSepcialities(): Observable<any> {
    const API_URL = `${this.search_API}/speciality`;
    return this.http.get(API_URL).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching all workers:', error);
        return throwError(() => new Error('Failed to fetch all workers. Please try again.'));
      })
    );
  }
}
