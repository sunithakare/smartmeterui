import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersSupplierListComponent } from './masters-supplier-list.component';

describe('MastersSupplierListComponent', () => {
  let component: MastersSupplierListComponent;
  let fixture: ComponentFixture<MastersSupplierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersSupplierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
