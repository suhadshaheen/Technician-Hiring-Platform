import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksGComponent } from './how-it-works-g.component';

describe('HowItWorksGComponent', () => {
  let component: HowItWorksGComponent;
  let fixture: ComponentFixture<HowItWorksGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowItWorksGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
