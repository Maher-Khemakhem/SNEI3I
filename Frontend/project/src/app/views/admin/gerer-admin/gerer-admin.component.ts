import { Component, OnInit } from '@angular/core';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gerer-admin',
  standalone: true,
  imports: [CommonModule,MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,],
  templateUrl: './gerer-admin.component.html',
  styleUrl: './gerer-admin.component.css'
})
export class GererAdminComponent implements OnInit{
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'num_tel', 'Date_of_birth', 'photo', 'actions'];

  admins:any;
  constructor(private loginService:LoginService,private router:Router,private clientservice:ClientService,private a:MatDialog,private adminservice:AdminService){}
  ngOnInit(): void {
      this.getAdmins();
  }
  getAdmins(){
    this.adminservice.getAllAdmins().subscribe((data)=>{
      
      this.admins = data.admins;
      console.log(this.admins);
    })
  }
  openUpdate(id:any){
    const modal = this.a.open(UpdateAdminComponent,{
      width:'55%',
      height:'75%',
      data:{id:id}
    });
    modal.afterClosed().subscribe((res:any)=>{
        if(res){
          this.getAdmins();
        }
    })
  }
  openCreate(){
    const modal = this.a.open(CreateAdminComponent,{
      width:'55%',
      height:'75%',
      data:{}
    });
    modal.afterClosed().subscribe((res:any)=>{
        if(res){
          this.getAdmins();
        }
    })
  }
  deletee(id: any): void {
    console.log("admin");
    this.adminservice.deleteAdmin(id).subscribe({
      next: (response) => {
        this.getAdmins();
        console.log('Admin deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error deleting admin:', error);
      }
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
}
