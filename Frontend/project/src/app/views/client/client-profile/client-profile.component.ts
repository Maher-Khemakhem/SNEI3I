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
  styleUrls: ['./client-profile.component.css'], // Corrected typo
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'client', 'worker', 'date', 'status', 'price'];
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Reservation>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  client: any;

  constructor(private clientService: ClientService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    const id = '1'; // Mocked ID for demonstration
    if (id) {
      this.clientService.getClientById('67423f458b448111c58478ec').subscribe({
        next: (clientData) => {
          this.client = clientData;
          console.log('Client data fetched successfully:', clientData);
        },
        error: (err) => {
          console.error('Error fetching client data:', err);
        },
      });
    } else {
      console.error('No client ID found in localStorage');
    }

    this.fetchReservations(); // Fetch reservations on initialization
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchReservations(): void {
    this.reservationService.getClientReservations('67423f458b448111c58478ec').subscribe({
          next: (reservation: Reservation) => {
            this.dataSource.data = [reservation];
            console.log('Reservation fetched successfully:', reservation);
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
