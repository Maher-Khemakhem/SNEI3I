import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  CalendarModule,
  CalendarView,
  DateAdapter,
} from 'angular-calendar';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
}
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OffreService } from '../../../services/offre.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-reservation-client',
  standalone: true,
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css'],
  imports: [
    CalendarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatListModule,
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-US',
    },
  ],
})

export class ReservationClientComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selectedDate: Date | null = null;
  activeDayIsOpen = true;
  modalData: { action: string; event: any } | undefined;
  refresh!: Subject<any>;
  events: Event[] = [];
  reservationForm: FormGroup;
  client_location:any;
  constructor(private modal: NgbModal,private fb: FormBuilder,private offreservice:OffreService,private clientservice:ClientService) {
    this.reservationForm = this.fb.group({
      date: [this.viewDate, Validators.required], // Date control, required
      description: ['', Validators.required], 
      client_location:['',Validators.required],
      price:['',Validators.required],
    });
  }
  onDateChange(event: any): void {
    this.selectedDate = event; // Mat-calendar provides the selected date directly.
    this.viewDate = event; // Update the viewDate for the right column.
  }
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      console.log('Submitting reservation:', reservationData);
      // Example: Post reservation data to the server
      // this.http.post('/api/reservations', reservationData).subscribe(response => {
      //   console.log('Reservation confirmed:', response);
      // });
      alert(`Reservation made for ${reservationData.date} with description: ${reservationData.description}`);
    } else {
      alert('Please complete the form before submitting.');
    }
  }
  
  send(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
  
      // Ensure localStorage values are available
      const clientId = localStorage.getItem('client_id');
      const workerId = localStorage.getItem('filterworker_id');
  
      if (!clientId || !workerId) {
        alert('Client or Worker ID is missing in local storage. Please log in or select a worker.');
        return;
      }
  
      // Prepare the form data
      const formData = {
        Client_id: clientId,
        Worker_id: workerId,
        Client_location: reservationData.client_location,
        date: reservationData.date,
        price: reservationData.price,
        message: reservationData.description,
      };
      console.log(formData);
      // Call the service to send the reservation
      this.offreservice.sendOffre(formData).subscribe(
        (response) => {
          console.log('Reservation successfully sent:', response);
          alert('Reservation submitted successfully!');
        },
        (error) => {
          console.error('Error submitting reservation:', error);
          alert('An error occurred while submitting the reservation. Please try again later.');
        }
      );
  
      console.log('Submitting reservation:', formData);
    } else {
      alert('Please complete the form before submitting.');
    }
  }

  // Function to get events for the selected date
  getEventsForDay(date: Date): Event[] {
    return this.events.filter(event => {
      return (
        event.start.toDateString() === date.toDateString() ||
        event.end.toDateString() === date.toDateString()
      );
    });
  }

  // Placeholder function for reserving an event
  reserveNow(): void {
    if (this.selectedDate ) {
      alert(`Reservation made for on ${this.selectedDate}`);
      // Logic for making the reservation can be added here
    } else {
      alert('Please select a worker and a date before reserving.');
    }
  }
  setView(view: CalendarView): void {
    this.view = view;
  }

  
  

}


