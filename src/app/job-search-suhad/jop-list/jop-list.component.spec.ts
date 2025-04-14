import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JopListComponent } from './jop-list.component';

describe('JopListComponent', () => {
  let component: JopListComponent;
  let fixture: ComponentFixture<JopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
