import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimActivationDeactivationDetailsComponent } from './sim-activation-deactivation-details.component';

describe('SimActivationDeactivationDetailsComponent', () => {
  let component: SimActivationDeactivationDetailsComponent;
  let fixture: ComponentFixture<SimActivationDeactivationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimActivationDeactivationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimActivationDeactivationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
