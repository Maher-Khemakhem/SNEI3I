import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent implements OnInit {
  offreservice = inject(WorkerService);
  loginService = inject(LoginService);

  offreList: any[] = [];
  worker_id: string = localStorage.getItem('worker_id') ?? '';
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['clientName', 'date', 'message', 'location', 'price', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllOffres();
    
  }

  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllOffres(): void {
    this.offreservice.getOffers(this.worker_id).subscribe({
      next: (res: any) => {
        this.offreList = res.offre;
        this.dataSource.data = this.offreList;
        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.error('Failed to fetch offers:', error);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  acceptOffre(id_offre: string, client_id: string, date: any, price: any): void {
    console.log('Accepting offer:', { id_offre, client_id, date, price });
    this.offreservice.acceptOffre(this.worker_id, id_offre).subscribe({
      next: () => {
        console.log('Offer accepted successfully');
        this.createReservation(client_id, date, price);
      },
      error: (error) => {
        console.error('Failed to accept the offer:', error);
      },
    });
  }

  createReservation(client_id: any, date: any, price: any): void {
    console.log('Creating reservation:', { client_id, date, price });
    this.offreservice.createReservation(this.worker_id, client_id, date, price).subscribe({
      next: () => {
        console.log('Reservation created successfully');
        window.alert('Reservation created successfully.');
        this.getAllOffres();
      },
      error: (error) => {
        console.error('Failed to create the reservation:', error);
        window.alert('Failed to create the reservation: ' + error.message);
      },
    });
  }

  rejectOffre(id_offre: string): void {
    console.log('Rejecting offer:', id_offre);
    this.offreservice.rejectOffre(this.worker_id, id_offre).subscribe({
      next: () => {
        console.log('Offer rejected successfully');
        this.getAllOffres(); // Refresh the offers list after rejection
      },
      error: (error) => {
        console.error('Failed to reject the offer:', error);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('worker_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    this.loginService.logout();
  }
}
