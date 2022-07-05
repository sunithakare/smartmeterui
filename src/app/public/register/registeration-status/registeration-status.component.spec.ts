import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationStatusComponent } from './registeration-status.component';

describe('RegisterationStatusComponent', () => {
  let component: RegisterationStatusComponent;
  let fixture: ComponentFixture<RegisterationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
