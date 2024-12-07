import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientComponent } from './update-client/update-client.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-gerer-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatPaginatorModule, MatIconModule, MatCardModule, MatTableModule,MatProgressSpinnerModule],
  templateUrl: './gerer-client.component.html',
  styleUrls: ['./gerer-client.component.css']
})
export class GererClientComponent implements OnInit, AfterViewInit {
openCreate() {
throw new Error('Method not implemented.');
}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clients: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'num_tel', 'Date_of_birth', 'photo', 'actions'];
  dataSource = new MatTableDataSource<any>(this.clients);
  isLoading = true;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
     // Simulate data loading (e.g., API call)
     setTimeout(() => {
      this.isLoading = false; // Set to false when loading is complete
    }, 2000); // Replace with your actual loading logic
  }
  

  ngOnInit(): void {
    this.getClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe((data: any[]) => {
      this.clients = data;
      this.dataSource.data = this.clients;
      // Ensure the paginator is connected after the data is set
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('admin_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    this.loginService.logout();
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  goToGererAdmin(): void {
    this.router.navigate(['/admin/gerer-admin']);
  }

  goToClient(): void {
    this.router.navigate(['/admin/gerer-client']);
  }

  goToWorker(): void {
    this.router.navigate(['/admin/gerer-worker']);
  }
  gotodashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  gotogereradmin(){
    this.router.navigate(['/admin/gerer-admin']);
  }
  gotoclient(){
    this.router.navigate(['/admin/gerer-client']);
  }
  gotoworker(){
    this.router.navigate(['/admin/gerer-worker']);
  }

  openUpdate(id: any): void {
    const modal = this.dialog.open(UpdateClientComponent, {
      width: '55%',
      height: '75%',
      data: { id: id }
    });

    modal.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getClients(); // Refresh the list after update
      }
    });
  }

  delete(id: any): void {
    this.clientService.deleteClient(id).subscribe(() => {
      this.getClients(); // Refresh the list after deletion
      console.log('Client deleted successfully');
    });
  }
}
