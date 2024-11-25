import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWorkerComponent } from './sign-up-worker.component';

describe('SignUpWorkerComponent', () => {
  let component: SignUpWorkerComponent;
  let fixture: ComponentFixture<SignUpWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
