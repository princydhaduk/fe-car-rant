import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularfleetsComponent } from './popularfleets.component';

describe('PopularfleetsComponent', () => {
  let component: PopularfleetsComponent;
  let fixture: ComponentFixture<PopularfleetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularfleetsComponent]
    });
    fixture = TestBed.createComponent(PopularfleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
