import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToSupplierComponent } from './return-to-supplier.component';

describe('ReturnToSupplierComponent', () => {
  let component: ReturnToSupplierComponent;
  let fixture: ComponentFixture<ReturnToSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnToSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
