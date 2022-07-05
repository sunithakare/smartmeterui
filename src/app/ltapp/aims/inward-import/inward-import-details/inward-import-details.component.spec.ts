import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardImportDetailsComponent } from './inward-import-details.component';

describe('InwardImportDetailsComponent', () => {
  let component: InwardImportDetailsComponent;
  let fixture: ComponentFixture<InwardImportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardImportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardImportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
