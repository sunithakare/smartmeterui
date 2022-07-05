import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiFieldUserListComponent } from './ci-field-user-list.component';

describe('CiFieldUserListComponent', () => {
  let component: CiFieldUserListComponent;
  let fixture: ComponentFixture<CiFieldUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiFieldUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiFieldUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
