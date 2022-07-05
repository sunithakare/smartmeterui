import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMiDataComponent } from './import-mi-data.component';

describe('ImportMiDataComponent', () => {
  let component: ImportMiDataComponent;
  let fixture: ComponentFixture<ImportMiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMiDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
