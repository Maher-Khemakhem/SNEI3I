import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererAdminComponent } from './gerer-admin.component';

describe('GererAdminComponent', () => {
  let component: GererAdminComponent;
  let fixture: ComponentFixture<GererAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
