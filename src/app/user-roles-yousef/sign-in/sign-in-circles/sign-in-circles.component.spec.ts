import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCirclesComponent } from './sign-in-circles.component';

describe('SignInCirclesComponent', () => {
  let component: SignInCirclesComponent;
  let fixture: ComponentFixture<SignInCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInCirclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
