import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardImportComponent } from './inward-import.component';

describe('InwardImportComponent', () => {
  let component: InwardImportComponent;
  let fixture: ComponentFixture<InwardImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
