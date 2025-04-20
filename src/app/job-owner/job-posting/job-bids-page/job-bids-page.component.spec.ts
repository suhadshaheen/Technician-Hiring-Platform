import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBidsPageComponent } from './job-bids-page.component';

describe('JobBidsPageComponent', () => {
  let component: JobBidsPageComponent;
  let fixture: ComponentFixture<JobBidsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBidsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBidsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
