import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private REST_API = 'http://localhost:3000/offre'; // API base URL

  constructor(private http: HttpClient) { }

  sendOffre(data: any): Observable<any> {
    return this.http.post<any>(this.REST_API, data).pipe(
      catchError(error => {
        console.error('Error occurred while sending offer:', error);
        // Optionally return an error message or null
        return of({ success: false, message: 'An error occurred while sending the offer.' });
      })
    );
  }
}
