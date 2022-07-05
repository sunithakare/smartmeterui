import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentApproverComponent } from './indent-approver.component';

describe('IndentApproverComponent', () => {
  let component: IndentApproverComponent;
  let fixture: ComponentFixture<IndentApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentApproverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
