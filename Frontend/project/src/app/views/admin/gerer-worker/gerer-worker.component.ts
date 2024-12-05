import { Component } from '@angular/core';
import { UpdateWorkerComponent } from './update-worker/update-worker.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { WorkerService } from '../../../services/worker.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gerer-worker',
  standalone: true,
  imports: [CommonModule,NgbPaginationModule],
  templateUrl: './gerer-worker.component.html',
  styleUrl: './gerer-worker.component.css'
})
export class GererWorkerComponent {
  workers:any;
  photo:any;
  page:any=1;
  limit:any=3;
  skip:any;
  totalCount:any;
  constructor(private workerservice:WorkerService,private loginService:LoginService,private router:Router,private clientservice:ClientService,private a:MatDialog){}
  ngOnInit(): void {
      this.getWorkers();
  }
  getWorkers(){
    console.log("aaaaa");
    if(this.page==1){
      this.skip = 0;
    }else{
      this.skip = (this.page-1)*this.limit;
    }
    var requestObj = {
      'limit' : this.limit,
      'skip': this.skip,
    }
    this.workerservice.getAllworkerslimit(requestObj).subscribe(
      (data: any) => {
        this.workers = data.workers || []; // Assuming data contains `workers` array
        this.totalCount = data.totalCount || 0; // Assuming backend sends total count
      },
      (error) => {
        console.error('Error fetching workers:', error);
      }
    );
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
