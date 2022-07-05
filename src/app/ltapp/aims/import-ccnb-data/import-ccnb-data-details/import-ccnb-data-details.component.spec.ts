import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCcnbDataDetailsComponent } from './import-ccnb-data-details.component';

describe('ImportCcnbDataDetailsComponent', () => {
  let component: ImportCcnbDataDetailsComponent;
  let fixture: ComponentFixture<ImportCcnbDataDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCcnbDataDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCcnbDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
