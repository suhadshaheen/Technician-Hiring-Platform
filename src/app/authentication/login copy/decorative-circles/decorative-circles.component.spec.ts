import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorativeCirclesComponent } from './decorative-circles.component';

describe('DecorativeCirclesComponent', () => {
  let component: DecorativeCirclesComponent;
  let fixture: ComponentFixture<DecorativeCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorativeCirclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorativeCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
