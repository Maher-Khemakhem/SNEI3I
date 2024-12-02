import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {
  constructor(private clientservice:ClientService) {}
  client : any;
  ngOnInit(): void {
    // Get the worker ID from localStorage
    
    const id = localStorage.getItem('landingpageclientid');  // Corrected syntax
    if (id) {
      // Ensure the ID exists before making a request
      this.clientservice.getClientById('674da09fd806f0b21be21e0a').subscribe({
       
        next: (clientdata) => {
          this.client = clientdata;
          
          
         },
        error: (err) => {
          console.error('Error fetching client data:', err); // Handle errors gracefully
        }
      });
    } else {
      console.error('No client ID found in localStorage'); // Log error if ID is not found
    }
  }


}
