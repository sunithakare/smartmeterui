import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersSupplierDetailsComponent } from './masters-supplier-details.component';

describe('MastersSupplierDetailsComponent', () => {
  let component: MastersSupplierDetailsComponent;
  let fixture: ComponentFixture<MastersSupplierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersSupplierDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersSupplierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
