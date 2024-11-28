import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFeedbackComponent } from './client-feedback.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

describe('ClientFeedbackComponent', () => {
  let component: ClientFeedbackComponent;
  let fixture: ComponentFixture<ClientFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
