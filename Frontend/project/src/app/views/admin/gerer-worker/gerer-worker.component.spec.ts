import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererWorkerComponent } from './gerer-worker.component';

describe('GererWorkerComponent', () => {
  let component: GererWorkerComponent;
  let fixture: ComponentFixture<GererWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
