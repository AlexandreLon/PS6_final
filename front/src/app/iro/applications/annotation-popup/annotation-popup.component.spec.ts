import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationPopupComponent } from './annotation-popup.component';

describe('AnnotationPopupComponent', () => {
  let component: AnnotationPopupComponent;
  let fixture: ComponentFixture<AnnotationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
