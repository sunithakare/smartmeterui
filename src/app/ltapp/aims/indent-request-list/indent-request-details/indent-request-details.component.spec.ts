import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRequestDetailsComponent } from './indent-request-details.component';

describe('IndentRequestDetailsComponent', () => {
  let component: IndentRequestDetailsComponent;
  let fixture: ComponentFixture<IndentRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
