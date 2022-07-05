import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiFieldUserAllotmentComponent } from './ci-field-user-allotment.component';

describe('CiFieldUserAllotmentComponent', () => {
  let component: CiFieldUserAllotmentComponent;
  let fixture: ComponentFixture<CiFieldUserAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiFieldUserAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiFieldUserAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
