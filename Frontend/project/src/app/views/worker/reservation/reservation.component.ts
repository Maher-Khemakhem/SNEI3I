import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  isLoaded :boolean  = true;
  workerService = inject(WorkerService);
  loginService = inject(LoginService);

  reservationList : any;
  worker_id: string = localStorage.getItem('worker_id') ?? ''; // Using nullish coalescing operator

  ngOnInit(): void {
    this.getAllReservation();
    
  }

  getAllReservation() {
    this.workerService.getReservation(this.worker_id).subscribe((res: any) => {
      this.reservationList=res;
      this.isLoaded = true;
      
    });
  }
  make(id:string){
    alert(id)
  }
  logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
      localStorage.removeItem("token");
    this.loginService.logout();
  }

}
