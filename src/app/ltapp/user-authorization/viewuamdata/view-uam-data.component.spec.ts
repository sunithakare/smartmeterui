import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUamDataComponent } from './view-uam-data.component';

describe('ViewUamDataComponent', () => {
  let component: ViewUamDataComponent;
  let fixture: ComponentFixture<ViewUamDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUamDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUamDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
