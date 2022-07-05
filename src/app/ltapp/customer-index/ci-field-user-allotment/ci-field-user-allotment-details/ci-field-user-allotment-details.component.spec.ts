import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiFieldUserAllotmentDetailsComponent } from './ci-field-user-allotment-details.component';

describe('CiFieldUserAllotmentDetailsComponent', () => {
  let component: CiFieldUserAllotmentDetailsComponent;
  let fixture: ComponentFixture<CiFieldUserAllotmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiFieldUserAllotmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiFieldUserAllotmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
