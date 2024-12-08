import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Choose2Component } from './choose2.component';

describe('Choose2Component', () => {
  let component: Choose2Component;
  let fixture: ComponentFixture<Choose2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Choose2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Choose2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
