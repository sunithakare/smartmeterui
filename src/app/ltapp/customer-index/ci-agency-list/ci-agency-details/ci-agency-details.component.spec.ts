import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAgencyDetailsComponent } from './ci-agency-details.component';

describe('CiAgencyDetailsComponent', () => {
  let component: CiAgencyDetailsComponent;
  let fixture: ComponentFixture<CiAgencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiAgencyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAgencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
