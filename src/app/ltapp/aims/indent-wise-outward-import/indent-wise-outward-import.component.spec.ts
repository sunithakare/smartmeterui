import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentWiseOutwardImportComponent } from './indent-wise-outward-import.component';

describe('IndentWiseOutwardImportComponent', () => {
  let component: IndentWiseOutwardImportComponent;
  let fixture: ComponentFixture<IndentWiseOutwardImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentWiseOutwardImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentWiseOutwardImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
