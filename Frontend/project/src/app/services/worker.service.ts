import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_offres } from '../model/interface/API';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

    constructor(private http: HttpClient) { }

  getOffers(worker_id: string): Observable<API_offres> {
    return this.http.get<API_offres>(`http://localhost:3000/worker/offre/${worker_id}`);
  }
  
}
