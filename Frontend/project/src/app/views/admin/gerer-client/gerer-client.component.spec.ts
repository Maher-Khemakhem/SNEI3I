import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererClientComponent } from './gerer-client.component';

describe('GererClientComponent', () => {
  let component: GererClientComponent;
  let fixture: ComponentFixture<GererClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
