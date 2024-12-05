import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'], // Changed to `styleUrls` for proper array type
})
export class ReservationComponent implements OnInit {
  isLoaded: boolean = false; // Changed to false to show spinner initially
  workerService = inject(WorkerService);
  loginService = inject(LoginService);

  reservationList: any[] = [];
  worker_id: string = localStorage.getItem('worker_id') ?? '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['clientName', 'date', 'location', 'price', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllReservation();
  }

  getAllReservation() {
    this.workerService.getReservation(this.worker_id).subscribe((res: any) => {
      this.reservationList = res;
      this.dataSource.data = this.reservationList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoaded = true;
    });
  }

  make(id: string) {
    alert(`Action triggered for reservation ID: ${id}`);
  }

  logout() {
    localStorage.removeItem('worker_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    this.loginService.logout();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
