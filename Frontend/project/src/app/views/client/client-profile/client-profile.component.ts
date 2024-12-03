import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'], // Ensure this file exists
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'client', 'worker', 'date', 'status', 'price'];
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Reservation>([]);
  id = localStorage.getItem('client_id');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   // Define client type or use `any`
   client: any;
  constructor(
    private clientService: ClientService,
    private reservationService: ReservationService
  ) {

  }

  ngOnInit(): void {
    this.fetchClientData(this.id||'');
    this.fetchReservations(this.id||''); // Fetch reservations on initialization
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchClientData(clientId: string): void {
    this.clientService.getClientById(clientId).subscribe({
      next: (clientData) => {
        this.client = clientData;
        console.log('Client data fetched successfully:', clientData);
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
      },
    });
  }

  fetchReservations(clientId: string): void {
    this.reservationService.getClientReservations(clientId).subscribe({
      next: (reservations: Reservation[]) => {
        this.dataSource.data = reservations; // Pass the array directly
        console.log('Reservations fetched successfully:', reservations);
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
  message?: string; // Optional field
}


