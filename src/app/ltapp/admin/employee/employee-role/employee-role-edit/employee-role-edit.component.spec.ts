import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleEditComponent } from './employee-role-edit.component';

describe('EmployeeRoleEditComponent', () => {
  let component: EmployeeRoleEditComponent;
  let fixture: ComponentFixture<EmployeeRoleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRoleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
