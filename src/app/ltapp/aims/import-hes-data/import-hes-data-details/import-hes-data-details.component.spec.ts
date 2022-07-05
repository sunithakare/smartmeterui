import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportHesDataDetailsComponent } from './import-hes-data-details.component';

describe('ImportHesDataDetailsComponent', () => {
  let component: ImportHesDataDetailsComponent;
  let fixture: ComponentFixture<ImportHesDataDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportHesDataDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportHesDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
