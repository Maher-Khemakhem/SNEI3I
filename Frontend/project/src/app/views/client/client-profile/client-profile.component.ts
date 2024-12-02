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
  dataSource = new MatTableDataSource<Reservation>([]);

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
    
    const ELEMENT_DATA: Reservation[] = [];
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

