import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAllotmentListComponent } from './supervisor-allotment-list.component';

describe('SupervisorAllotmentListComponent', () => {
  let component: SupervisorAllotmentListComponent;
  let fixture: ComponentFixture<SupervisorAllotmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAllotmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAllotmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
