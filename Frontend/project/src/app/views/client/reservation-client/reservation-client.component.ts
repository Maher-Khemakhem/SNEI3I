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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
}
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
    MatListModule,
    CommonModule,
    NgbModalModule,
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
  events: Event[] = [
    {
      title: 'Meeting with client',
      start: new Date(2024, 11, 3, 10, 0),
      end: new Date(2024, 11, 3, 11, 0),
      description: 'Discuss project requirements with the client.'
    },
    {
      title: 'Team Standup',
      start: new Date(2024, 11, 3, 13, 0),
      end: new Date(2024, 11, 3, 13, 30),
      description: 'Daily team sync-up meeting.'
    }
  ];

  constructor(private modal: NgbModal) {
    
    
  }
  onDateChange(date: Date | null): void {
    if (date) {
      this.viewDate = date;
      this.selectedDate = date;
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


