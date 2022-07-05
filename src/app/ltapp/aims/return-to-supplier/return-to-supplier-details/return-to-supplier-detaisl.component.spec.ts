import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToSupplierDetaislComponent } from './return-to-supplier-detaisl.component';

describe('ReturnToSupplierDetaislComponent', () => {
  let component: ReturnToSupplierDetaislComponent;
  let fixture: ComponentFixture<ReturnToSupplierDetaislComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnToSupplierDetaislComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToSupplierDetaislComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
