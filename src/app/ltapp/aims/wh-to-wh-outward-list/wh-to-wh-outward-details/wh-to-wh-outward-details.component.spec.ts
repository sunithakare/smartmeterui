import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhToWhOutwardDetailsComponent } from './wh-to-wh-outward-details.component';

describe('WhToWhOutwardDetailsComponent', () => {
  let component: WhToWhOutwardDetailsComponent;
  let fixture: ComponentFixture<WhToWhOutwardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhToWhOutwardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhToWhOutwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
