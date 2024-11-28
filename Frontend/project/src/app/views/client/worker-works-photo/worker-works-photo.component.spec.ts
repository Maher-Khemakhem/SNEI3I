import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerWorksPhotoComponent } from './worker-works-photo.component';

describe('WorkerWorksPhotoComponent', () => {
  let component: WorkerWorksPhotoComponent;
  let fixture: ComponentFixture<WorkerWorksPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerWorksPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerWorksPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
