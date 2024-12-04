import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
