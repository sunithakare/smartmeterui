import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySerialNoListComponent } from './display-serial-no-list.component';

describe('DisplaySerialNoListComponent', () => {
  let component: DisplaySerialNoListComponent;
  let fixture: ComponentFixture<DisplaySerialNoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySerialNoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySerialNoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
