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
        console.error('Error occurred while fetching reservation:', error);
        return throwError(() => new Error('Failed to fetch reservation. Please try again.'));
      })
    );
  }
  getTotalrevenue(worker_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/reservation/total/${worker_id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching the total:', error);
        return throwError(() => new Error('Failed to fetch the total. Please try again.'));
      })
    );
  }
    getMonthlyrevenue(worker_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/reservation/thismonth/${worker_id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching the monthly revenue:', error);
        return throwError(() => new Error('Failed to fetch the monthly revenue. Please try again.'));
      })
    );
  }
      getDailyrevenue(worker_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/reservation/today/${worker_id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching the monthly revenue:', error);
        return throwError(() => new Error('Failed to fetch the monthly revenue. Please try again.'));
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
acceptOffre(id_worker: any, id_offre: any): Observable<any> {
  const API_URL = `http://localhost:3000/worker/acceptOffre/${id_worker}/${id_offre}`; // Adjust endpoint as needed
  console.log('Making PATCH request to:', API_URL);
  return this.http.put(API_URL, {}).pipe(
    catchError((error) => {
      console.error('Error occurred while accepting the offer:', error);
      return throwError(() => new Error('Failed to accept the offer. Please try again.'));
    })
  );
}
rejectOffre(id_worker: any, id_offre: any): Observable<any> {
  const API_URL = `http://localhost:3000/worker/rejectOffre/${id_worker}/${id_offre}`; // Adjust endpoint as needed
  console.log('Making PATCH request to:', API_URL);
  return this.http.put(API_URL, this.httpHeaders).pipe(    
    catchError((error) => {
      console.error('Error occurred while rejecting the offer:', error);
      return throwError(() => new Error('Failed to reject the offer. Please try again.'));
    })
  );
}

createReservation(id_worker: any, id_client: any, date: any, price: any): Observable<any> {
  const API_URL = `http://localhost:3000/reservation`;
  const body = {
    client: id_client,
    worker: id_worker,
    date: date,
    price: price
  };
  return this.http.post(API_URL, body, { headers: this.httpHeaders }).pipe(
    catchError((error) => {
      console.error('Error occurred while creating reservation:', error);
      return throwError(() => new Error('Failed to create reservation. Please try again.'));
    })
  );
}
updateWorker(worker_id: any, body: any) {
  console.log('Worker ID:', worker_id); // Log worker_id
  console.log('Request Body:', body); // Log request payload

  
  return this.http.put(`http://localhost:3000/worker/update/${worker_id}`, body, { headers: this.httpHeaders }).pipe(
    catchError((error) => {
      console.error('Detailed error:', error); // Log full error details
      alert(`Failed to update the worker: ${error.message}`);
      return throwError(() => new Error('Failed to update the worker. Please try again.'));
    })
  );
}
deleteWorker(worker_id: any) {
  
  return this.http.delete(`http://localhost:3000/worker/delete/${worker_id}`, ).pipe(
    catchError((error) => {
      console.error('Detailed error:', error); // Log full error details
      //alert(`Failed to delete the worker: ${error.message}`);
      return throwError(() => new Error('Failed to delete the worker. Please try again.'));
    })
  );
}
// photo  : 
uploadWorkPhotos(workerId: string, formData: FormData) {
  return this.http.post(`http://localhost:3000/updatephoto/${workerId}`, formData);
}





}
