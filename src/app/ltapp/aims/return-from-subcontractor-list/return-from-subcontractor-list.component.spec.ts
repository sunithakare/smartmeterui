import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFromSubcontractorListComponent } from './return-from-subcontractor-list.component';

describe('ReturnFromSubcontractorListComponent', () => {
  let component: ReturnFromSubcontractorListComponent;
  let fixture: ComponentFixture<ReturnFromSubcontractorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnFromSubcontractorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnFromSubcontractorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
