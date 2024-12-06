import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  client: string;
  worker: string;
  date: Date;
  status: string;
  price: number;
  message?: string;
}

@Injectable({
  providedIn: 'root', // Marks this service as injectable
})
export class ReservationService {
  private REST_API = 'http://localhost:3000/reservation'; // API base URL

  constructor(private http: HttpClient) {}

  // Method to fetch all reservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.REST_API);
  }

  // Method to fetch a single reservation by ID
  getClientReservations(id: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.REST_API}/client/${id}`);
  }

  // Method to create a new reservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.REST_API, reservation);
  }

  // Method to update a reservation
  updateReservation(id: string, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.REST_API}/${id}`, reservation);
  }

  // Method to delete a reservation
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.REST_API}/${id}`);
  }
  baddel(id:any,data:any): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.REST_API}/finished/${id}`,data);
  }
}
