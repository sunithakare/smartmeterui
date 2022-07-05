import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMeterOutwardComponent } from './old-meter-outward.component';

describe('OldMeterOutwardComponent', () => {
  let component: OldMeterOutwardComponent;
  let fixture: ComponentFixture<OldMeterOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldMeterOutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldMeterOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
