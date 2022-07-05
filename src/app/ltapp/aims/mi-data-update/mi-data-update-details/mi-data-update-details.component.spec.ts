import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiDataUpdateDetailsComponent } from './mi-data-update-details.component';

describe('MiDataUpdateDetailsComponent', () => {
  let component: MiDataUpdateDetailsComponent;
  let fixture: ComponentFixture<MiDataUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiDataUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiDataUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
