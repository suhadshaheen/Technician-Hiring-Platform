import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotCirclesComponent } from './forgot-circles.component';

describe('ForgotCirclesComponent', () => {
  let component: ForgotCirclesComponent;
  let fixture: ComponentFixture<ForgotCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotCirclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
