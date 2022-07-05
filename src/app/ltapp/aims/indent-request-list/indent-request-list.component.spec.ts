import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRequestListComponent } from './indent-request-list.component';

describe('IndentRequestListComponent', () => {
  let component: IndentRequestListComponent;
  let fixture: ComponentFixture<IndentRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
