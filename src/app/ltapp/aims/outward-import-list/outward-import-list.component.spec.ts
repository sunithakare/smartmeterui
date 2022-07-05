import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardImportListComponent } from './outward-import-list.component';

describe('OutwardImportListComponent', () => {
  let component: OutwardImportListComponent;
  let fixture: ComponentFixture<OutwardImportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardImportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
