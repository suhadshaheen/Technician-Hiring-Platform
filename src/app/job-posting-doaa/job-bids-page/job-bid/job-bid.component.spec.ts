import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBidComponent } from './job-bid.component';

describe('JobBidComponent', () => {
  let component: JobBidComponent;
  let fixture: ComponentFixture<JobBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
