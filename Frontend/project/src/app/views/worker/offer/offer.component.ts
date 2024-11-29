import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'], // Corrected 'styleUrls'
})
export class OfferComponent implements OnInit {
  offreservice = inject(WorkerService);
  offreList : any;
  worker_id: string = localStorage.getItem('worker_id') ?? ''; // Using nullish coalescing operator

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres() {
    this.offreservice.getOffers(this.worker_id).subscribe((res: any) => {
      this.offreList=res;
    });
  }
  make(id:string){
    alert(id)
  }
  logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
  }
}
