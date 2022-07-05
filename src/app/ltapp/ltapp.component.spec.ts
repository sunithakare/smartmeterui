import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtappComponent } from './ltapp.component';

describe('LtappComponent', () => {
  let component: LtappComponent;
  let fixture: ComponentFixture<LtappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
