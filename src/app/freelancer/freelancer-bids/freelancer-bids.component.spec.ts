import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerBidsComponent } from './freelancer-bids.component';

describe('FreelancerBidsComponent', () => {
  let component: FreelancerBidsComponent;
  let fixture: ComponentFixture<FreelancerBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerBidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
