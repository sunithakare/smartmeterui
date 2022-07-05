import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGroupDetailsComponent } from './item-group-details.component';

describe('ItemGroupDetailsComponent', () => {
  let component: ItemGroupDetailsComponent;
  let fixture: ComponentFixture<ItemGroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGroupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
