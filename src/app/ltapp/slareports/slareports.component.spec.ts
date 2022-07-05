import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlareportsComponent } from './slareports.component';

describe('SlareportsComponent', () => {
  let component: SlareportsComponent;
  let fixture: ComponentFixture<SlareportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlareportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlareportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
