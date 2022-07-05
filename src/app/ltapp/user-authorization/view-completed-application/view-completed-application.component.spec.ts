import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedApplicationComponent } from './view-completed-application.component';

describe('ViewCompletedApplicationComponent', () => {
  let component: ViewCompletedApplicationComponent;
  let fixture: ComponentFixture<ViewCompletedApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompletedApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
