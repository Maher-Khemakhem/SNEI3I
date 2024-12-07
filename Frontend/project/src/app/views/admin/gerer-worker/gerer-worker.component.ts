import { Component } from '@angular/core';
import { UpdateWorkerComponent } from './update-worker/update-worker.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { WorkerService } from '../../../services/worker.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-gerer-worker',
  standalone: true,
  imports: [CommonModule,NgbPaginationModule,MatTableModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule,MatCardModule,MatProgressSpinnerModule ],
  templateUrl: './gerer-worker.component.html',
  styleUrl: './gerer-worker.component.css'
})
export class GererWorkerComponent {
openCreate() {
throw new Error('Method not implemented.');
}
  workers:any;
  photo:any;
  page:any=1;
  limit:any=3;
  skip:any;
  totalCount:any;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'num_tel', 'date_of_birth', 'photo', 'speciality', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = true;
  constructor(private workerservice:WorkerService,private loginService:LoginService,private router:Router,private clientservice:ClientService,private a:MatDialog){
    setTimeout(() => {
      this.isLoading = false; // Set to false when loading is complete
    }, 2000); // Replace with your actual loading logic
  }
  
  ngOnInit(): void {
      this.getWorkers();
  }
  getWorkers(): void {
    this.workerservice.getAllworkers().subscribe((workers: any[]) => {
      this.dataSource.data = workers;
    });
  }

  
  logout(){
    localStorage.removeItem("admin_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.loginService.logout();

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
  openUpdate(id:any){
    const modal = this.a.open(UpdateWorkerComponent,{
      width:'55%',
      height:'75%',
      data:{id:id}
    });
    modal.afterClosed().subscribe((res:any)=>{
        if(res){
          this.getWorkers();
        }
    })
  }
  deletee(id:any){
    this.workerservice.deleteWorker(id).subscribe(()=>{
      this.getWorkers();
      console.log("worker deleted successfully");
    });
  }
}
