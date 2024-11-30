import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientComponent } from './update-client/update-client.component';

@Component({
  selector: 'app-gerer-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerer-client.component.html',
  styleUrl: './gerer-client.component.css'
})
export class GererClientComponent implements OnInit{
  clients:any;
  constructor(private loginService:LoginService,private router:Router,private clientservice:ClientService,private a:MatDialog){}
  ngOnInit(): void {
      this.getClients();
  }
  getClients(){
    this.clientservice.getAllClients().subscribe((data:any)=>{
      this.clients = data;
    })
  }
  logout(){
    localStorage.removeItem("worker_id");
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
    const modal = this.a.open(UpdateClientComponent,{
      width:'55%',
      height:'75%',
      data:{id:id}
    });
    modal.afterClosed().subscribe((res:any)=>{
        if(res){
          this.getClients();
        }
    })
  }
  delete(id:any){
    this.clientservice.deleteClient(id).subscribe(()=>{
      this.getClients();
      console.log("client deleted successfully");
    });
  }
}
