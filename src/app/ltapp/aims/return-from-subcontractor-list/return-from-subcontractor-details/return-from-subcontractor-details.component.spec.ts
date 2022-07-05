import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFromSubcontractorDetailsComponent } from './return-from-subcontractor-details.component';

describe('ReturnFromSubcontractorDetailsComponent', () => {
  let component: ReturnFromSubcontractorDetailsComponent;
  let fixture: ComponentFixture<ReturnFromSubcontractorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnFromSubcontractorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnFromSubcontractorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
