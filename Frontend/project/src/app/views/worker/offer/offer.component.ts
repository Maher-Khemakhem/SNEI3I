import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'], // Corrected 'styleUrls'
})
export class OfferComponent implements OnInit {
  offreservice = inject(WorkerService);
  loginService = inject(LoginService);

  offreList : any = [];
  worker_id: string = localStorage.getItem('worker_id') ?? ''; // Using nullish coalescing operator

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres() {
    this.offreservice.getOffers(this.worker_id).subscribe((res: any) => {
      this.offreList=res.offre;
    });
  }

  logout(){
    localStorage.removeItem("worker_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.loginService.logout();
  }
acceptOffre(id_offre: string, client_id: string, date: any, price: any) {
  console.log('Accepting offer:', { id_offre, client_id, date, price });
  this.offreservice.acceptOffre(this.worker_id, id_offre).subscribe({
    next: (response) => {
      console.log('Offer accepted successfully:', response);
      
      // Add more detailed logging
      console.log('About to create reservation');
      console.log('Worker ID:', this.worker_id);
      console.log('Client ID:', client_id);
      console.log('Date:', date);
      console.log('Price:', price);

    },
    error: (error) => {
      console.error('Failed to accept the offer:', error);
    }
  });
}

createReservation(client_id: any, date: any, price: any) {
  console.log("Creating reservation with details:", { client_id, date, price });
  alert(client_id);
  this.offreservice.createReservation(this.worker_id, client_id, date, price).subscribe({
    next: (response) => {
      console.log('Reservation created successfully:', response);
      
      // Ensure alert is triggered
      window.alert("Reservation created successfully.");
    },
    error: (error) => {
      console.error('Failed to create the reservation:', error);
      
      // Ensure alert is triggered
      window.alert("Failed to create the reservation: " + error.message);
    }
  });
}
rejectOffre(id_offre: string) {
  this.offreservice.rejectOffre(this.worker_id, id_offre).subscribe({
    next: (response) => {
      console.log('Offer accepted successfully:', response);

    },
    error: (error) => {
      console.error('Failed to accept the offer:', error);
    }
  });
}

}
