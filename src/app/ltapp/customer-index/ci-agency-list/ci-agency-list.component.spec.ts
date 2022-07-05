import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAgencyListComponent } from './ci-agency-list.component';

describe('CiAgencyListComponent', () => {
  let component: CiAgencyListComponent;
  let fixture: ComponentFixture<CiAgencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiAgencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAgencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
