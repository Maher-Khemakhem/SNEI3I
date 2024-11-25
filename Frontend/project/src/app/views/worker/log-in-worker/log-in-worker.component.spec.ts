import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInWorkerComponent } from './log-in-worker.component';

describe('LogInWorkerComponent', () => {
  let component: LogInWorkerComponent;
  let fixture: ComponentFixture<LogInWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
