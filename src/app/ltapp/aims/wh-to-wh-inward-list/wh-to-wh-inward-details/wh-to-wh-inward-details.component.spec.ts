import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhToWhInwardDetailsComponent } from './wh-to-wh-inward-details.component';

describe('WhToWhInwardDetailsComponent', () => {
  let component: WhToWhInwardDetailsComponent;
  let fixture: ComponentFixture<WhToWhInwardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhToWhInwardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhToWhInwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
