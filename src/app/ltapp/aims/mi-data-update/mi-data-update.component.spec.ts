import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiDataUpdateComponent } from './mi-data-update.component';

describe('MiDataUpdateComponent', () => {
  let component: MiDataUpdateComponent;
  let fixture: ComponentFixture<MiDataUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiDataUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiDataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
