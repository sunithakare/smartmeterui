import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCcnbDataComponent } from './import-ccnb-data.component';

describe('ImportCcnbDataComponent', () => {
  let component: ImportCcnbDataComponent;
  let fixture: ComponentFixture<ImportCcnbDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCcnbDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCcnbDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
