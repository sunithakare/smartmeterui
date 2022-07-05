import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiFieldUserDetailsComponent } from './ci-field-user-details.component';

describe('CiFieldUserDetailsComponent', () => {
  let component: CiFieldUserDetailsComponent;
  let fixture: ComponentFixture<CiFieldUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiFieldUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiFieldUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
