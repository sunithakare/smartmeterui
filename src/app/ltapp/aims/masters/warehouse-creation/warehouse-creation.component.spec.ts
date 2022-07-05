import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCreationComponent } from './warehouse-creation.component';

describe('WarehouseCreationComponent', () => {
  let component: WarehouseCreationComponent;
  let fixture: ComponentFixture<WarehouseCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
