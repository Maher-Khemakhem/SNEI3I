import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private REST_API = 'http://localhost:3000/client'; // API base URL
  constructor(private http:HttpClient) { }
  
  getAllClients(): Observable<any> {
    return this.http.get<any>(this.REST_API).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients. Please try again.'));
      })
    );
  }
  updateClient(id:any,data:any): Observable<any> {
    const API = `${this.REST_API}/${id}`;
    return this.http.put<any>(API,data).pipe(
      catchError((error) => {
        console.error('Error occurred while updating client:', error);
        return throwError(() => new Error('Failed to update client. Please try again.'));
      })
    );
  }
  deleteClient(id:any): Observable<any> {
    const API = `${this.REST_API}/${id}`;
    return this.http.delete<any>(API);
  }
  getClientById(id:any): Observable<any> {
    const API = `${this.REST_API}/${id}`;
    return this.http.get<any>(API);
  }
}
