import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReferenceIdDialogComponent } from './show-reference-id-dialog.component';

describe('ShowReferenceIdDialogComponent', () => {
  let component: ShowReferenceIdDialogComponent;
  let fixture: ComponentFixture<ShowReferenceIdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReferenceIdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReferenceIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
