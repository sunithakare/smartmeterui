import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentWiseOutwardImportDetailsComponent } from './indent-wise-outward-import-details.component';

describe('IndentWiseOutwardImportDetailsComponent', () => {
  let component: IndentWiseOutwardImportDetailsComponent;
  let fixture: ComponentFixture<IndentWiseOutwardImportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentWiseOutwardImportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentWiseOutwardImportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
