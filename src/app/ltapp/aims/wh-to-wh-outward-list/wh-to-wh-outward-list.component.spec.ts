import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhToWhOutwardListComponent } from './wh-to-wh-outward-list.component';

describe('WhToWhOutwardListComponent', () => {
  let component: WhToWhOutwardListComponent;
  let fixture: ComponentFixture<WhToWhOutwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhToWhOutwardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhToWhOutwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
