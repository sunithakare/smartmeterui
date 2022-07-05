import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCreationDetailsComponent } from './warehouse-creation-details.component';

describe('WarehouseCreationDetailsComponent', () => {
  let component: WarehouseCreationDetailsComponent;
  let fixture: ComponentFixture<WarehouseCreationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCreationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCreationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
