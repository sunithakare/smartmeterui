import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMeterInwardDetailsComponent } from './old-meter-inward-details.component';

describe('OldMeterInwardDetailsComponent', () => {
  let component: OldMeterInwardDetailsComponent;
  let fixture: ComponentFixture<OldMeterInwardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldMeterInwardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldMeterInwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
