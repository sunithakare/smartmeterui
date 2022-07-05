import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMeterOutwardDetailsComponent } from './old-meter-outward-details.component';

describe('OldMeterOutwardDetailsComponent', () => {
  let component: OldMeterOutwardDetailsComponent;
  let fixture: ComponentFixture<OldMeterOutwardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldMeterOutwardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldMeterOutwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
