import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerJobsPageComponent } from './owner-jobs-page.component';

describe('OwnerJobsPageComponent', () => {
  let component: OwnerJobsPageComponent;
  let fixture: ComponentFixture<OwnerJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerJobsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
