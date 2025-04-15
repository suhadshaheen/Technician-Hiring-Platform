import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditJobPageComponent } from './adit-job-page.component';

describe('AditJobPageComponent', () => {
  let component: AditJobPageComponent;
  let fixture: ComponentFixture<AditJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditJobPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
