import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestRatingsComponent } from './best-ratings.component';

describe('BestRatingsComponent', () => {
  let component: BestRatingsComponent;
  let fixture: ComponentFixture<BestRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestRatingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
