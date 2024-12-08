import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReservationService } from '../../../services/reservation.service';
import { WorkerService } from '../../../services/worker.service';
import { forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'], // Ensure this file exists
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'client', 'worker', 'date', 'status', 'price'];
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<any>([]);
  id = localStorage.getItem('client_id');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditMode = false;
   // Define client type or use `any`
   client: any;
  constructor(
    
    private clientService: ClientService,
    private reservationService: ReservationService,
    private workerservice:WorkerService
  ) {

  }

  ngOnInit(): void {
    this.fetchClientData(this.id||'');
    this.fetchReservations(this.id||'');
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleEditMode(): void {
    if (this.isEditMode) {
      // Logic to save changes goes here
      console.log('Changes saved');
    }
    this.isEditMode = !this.isEditMode;
  }

  fetchClientData(clientId: string): void {
    this.clientService.getClientById(clientId).subscribe({
      next: (clientData) => {
        this.client = clientData;
        console.log('Client data fetched successfully:', clientData);
        
        console.log(this.dataSource.data);
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
      },
    });
  }

  fetchReservations(clientId: string): void {
    this.reservationService.getClientReservations(clientId).subscribe({
      next: (reservations: any[]) => {
        // Create an array of observables for fetching worker data for each reservation
        const workerRequests = reservations.map(reservation => 
          this.workerservice.getWorkerbyID(reservation.worker).pipe(
            map((data: any) => {
              // Add worker's firstname and lastname to the reservation
              return {
                ...reservation,
                workerfirstname: data.firstname,
                workerlastname: data.lastname
              };
            })
          )
        );
  
        // Use forkJoin to wait for all worker requests to complete
        forkJoin(workerRequests).subscribe({
          next: (updatedReservations) => {
            // Update the dataSource with the updated reservations
            this.dataSource.data = updatedReservations;
            console.log('Reservations fetched successfully:', updatedReservations);
          },
          error: (err) => console.error('Error fetching workers:', err),
        });
      },
      error: (err) => console.error('Error fetching reservations:', err),
    });
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface Reservation {
  client: string;
  worker: string;
  date: Date;
  status: string;
  price: number;
  message?: string;
  
}


