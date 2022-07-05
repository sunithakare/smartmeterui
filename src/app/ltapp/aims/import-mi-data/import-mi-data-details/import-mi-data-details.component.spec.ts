import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMiDataDetailsComponent } from './import-mi-data-details.component';

describe('ImportMiDataDetailsComponent', () => {
  let component: ImportMiDataDetailsComponent;
  let fixture: ComponentFixture<ImportMiDataDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMiDataDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMiDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
