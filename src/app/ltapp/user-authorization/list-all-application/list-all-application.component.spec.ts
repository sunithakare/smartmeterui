import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllApplicationComponent } from './list-all-application.component';

describe('ListAllApplicationComponent', () => {
  let component: ListAllApplicationComponent;
  let fixture: ComponentFixture<ListAllApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
