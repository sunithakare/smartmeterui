import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubicComponent } from './pubic.component';

describe('PubicComponent', () => {
  let component: PubicComponent;
  let fixture: ComponentFixture<PubicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
