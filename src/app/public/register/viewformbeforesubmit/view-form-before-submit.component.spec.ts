import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormBeforeSubmitComponent } from './view-form-before-submit.component';

describe('ViewFormBeforeSubmitComponent', () => {
  let component: ViewFormBeforeSubmitComponent;
  let fixture: ComponentFixture<ViewFormBeforeSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormBeforeSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormBeforeSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
