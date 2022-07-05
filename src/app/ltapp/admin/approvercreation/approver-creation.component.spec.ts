import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverCreationComponent } from './approver-creation.component';

describe('ApproverCreationComponent', () => {
  let component: ApproverCreationComponent;
  let fixture: ComponentFixture<ApproverCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
