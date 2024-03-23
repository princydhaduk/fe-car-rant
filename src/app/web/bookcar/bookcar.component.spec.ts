import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcarComponent } from './bookcar.component';

describe('BookcarComponent', () => {
  let component: BookcarComponent;
  let fixture: ComponentFixture<BookcarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookcarComponent]
    });
    fixture = TestBed.createComponent(BookcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
