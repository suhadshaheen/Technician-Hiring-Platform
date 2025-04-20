import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSidebarComponent } from './freelancer-sidebar.component';

describe('FreelancerSidebarComponent', () => {
  let component: FreelancerSidebarComponent;
  let fixture: ComponentFixture<FreelancerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
