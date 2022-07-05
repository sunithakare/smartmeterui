import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardImportDetailsComponent } from './outward-import-details.component';

describe('OutwardImportDetailsComponent', () => {
  let component: OutwardImportDetailsComponent;
  let fixture: ComponentFixture<OutwardImportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardImportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardImportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
