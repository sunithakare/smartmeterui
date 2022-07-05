import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApprovalBucketComponent } from './my-approval-bucket.component';

describe('MyApprovalBucketComponent', () => {
  let component: MyApprovalBucketComponent;
  let fixture: ComponentFixture<MyApprovalBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApprovalBucketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApprovalBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
