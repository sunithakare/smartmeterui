import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAgencyAllotmentDetailsComponent } from './ci-agency-allotment-details.component';

describe('CiAgencyAllotmentDetailsComponent', () => {
  let component: CiAgencyAllotmentDetailsComponent;
  let fixture: ComponentFixture<CiAgencyAllotmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiAgencyAllotmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAgencyAllotmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
