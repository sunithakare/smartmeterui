import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentApproverDetailsComponent } from './indent-approver-details.component';

describe('IndentApproverDetailsComponent', () => {
  let component: IndentApproverDetailsComponent;
  let fixture: ComponentFixture<IndentApproverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentApproverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentApproverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
