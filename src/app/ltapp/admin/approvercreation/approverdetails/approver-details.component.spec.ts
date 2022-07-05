import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverDetailsComponent } from './approverdetails.component';

describe('ApproverDetailsComponent', () => {
  let component: ApproverDetailsComponent;
  let fixture: ComponentFixture<ApproverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
