import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAgencyAllotmentListComponent } from './ci-agency-allotment-list.component';

describe('CiAgencyAllotmentListComponent', () => {
  let component: CiAgencyAllotmentListComponent;
  let fixture: ComponentFixture<CiAgencyAllotmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiAgencyAllotmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAgencyAllotmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
