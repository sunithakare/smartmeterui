import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportHesDataComponent } from './import-hes-data.component';

describe('ImportHesDataComponent', () => {
  let component: ImportHesDataComponent;
  let fixture: ComponentFixture<ImportHesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportHesDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportHesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
