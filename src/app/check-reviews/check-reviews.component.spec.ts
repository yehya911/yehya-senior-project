import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckReviewsComponent } from './check-reviews.component';

describe('CheckReviewsComponent', () => {
  let component: CheckReviewsComponent;
  let fixture: ComponentFixture<CheckReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
