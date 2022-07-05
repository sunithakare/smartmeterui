import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimActivationDeactivationComponent } from './sim-activation-deactivation.component';

describe('SimActivationDeactivationComponent', () => {
  let component: SimActivationDeactivationComponent;
  let fixture: ComponentFixture<SimActivationDeactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimActivationDeactivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimActivationDeactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
