import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAllotmentDetailsComponent } from './supervisor-allotment-details.component';

describe('SupervisorAllotmentDetailsComponent', () => {
  let component: SupervisorAllotmentDetailsComponent;
  let fixture: ComponentFixture<SupervisorAllotmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAllotmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAllotmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
