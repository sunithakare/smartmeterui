import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhToWhInwardListComponent } from './wh-to-wh-inward-list.component';

describe('WhToWhInwardListComponent', () => {
  let component: WhToWhInwardListComponent;
  let fixture: ComponentFixture<WhToWhInwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhToWhInwardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhToWhInwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
