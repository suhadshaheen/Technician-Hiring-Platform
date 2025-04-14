import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageYComponent } from './home-page-y.component';

describe('HomePageYComponent', () => {
  let component: HomePageYComponent;
  let fixture: ComponentFixture<HomePageYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageYComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
