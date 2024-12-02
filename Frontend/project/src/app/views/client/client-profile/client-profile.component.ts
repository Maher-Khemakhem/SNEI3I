import { Component, OnInit, inject, AfterViewInit, ViewChild } from '@angular/core';
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
  styleUrl: './client-profile.component.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'client', 'worker', 'date', 'status', 'price'];
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Reservation>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // Added MatSort

  client: any;

  constructor(private clientservice: ClientService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    const id = '1'; // Mocked ID for demonstration
    if (id) {
      this.clientservice.getClientById('674da09fd806f0b21be21e0a').subscribe({
        next: (clientdata) => {
          this.client = clientdata;
        },
        error: (err) => {
          console.error('Error fetching client data:', err);
        },
      });
    } else {
      console.error('No client ID found in localStorage');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Correctly bind MatSort
  }
  fetchReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.dataSource.data = reservations; // Assign fetched data to the table's data source
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
  message?: string;
}

const ELEMENT_DATA: Reservation[] = [
  {
    client: '67423f458b448111c58478ec',
    worker: '6733b80e7cf19c19d1c12bbc',
    date: new Date('2024-12-01T00:00:00.000+00:00'),
    status: 'Confirmed',
    price: 150,
    message: 'Looking forward to the service!',
  },
  {
    client: '67423f458b448111c58478ec',
    worker: '6733b80e7cf19c19d1c12bbc',
    date: new Date('2024-12-01T00:00:00.000+00:00'),
    status: 'Confirmed',
    price: 1050,
    message: 'Looking forward to the service!',
  },
  {
    client: '67423f458b448111c58478ec',
    worker: '6733b80e7cf19c19d1c12bbc',
    date: new Date('2024-12-01T00:00:00.000+00:00'),
    status: 'Confirmed',
    price: 1500,
    message: 'Looking forward to the service!',
  },

];
