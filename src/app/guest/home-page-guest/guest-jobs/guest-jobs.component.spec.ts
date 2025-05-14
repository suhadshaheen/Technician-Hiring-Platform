import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestJobsComponent } from './guest-jobs.component';

describe('GuestJobsComponent', () => {
  let component: GuestJobsComponent;
  let fixture: ComponentFixture<GuestJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
