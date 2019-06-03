import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesTableComponent } from './wishes-table.component';

describe('WishesTableComponent', () => {
  let component: WishesTableComponent;
  let fixture: ComponentFixture<WishesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
