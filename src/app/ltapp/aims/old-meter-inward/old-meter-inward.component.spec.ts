import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMeterInwardComponent } from './old-meter-inward.component';

describe('OldMeterInwardComponent', () => {
  let component: OldMeterInwardComponent;
  let fixture: ComponentFixture<OldMeterInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldMeterInwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldMeterInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
