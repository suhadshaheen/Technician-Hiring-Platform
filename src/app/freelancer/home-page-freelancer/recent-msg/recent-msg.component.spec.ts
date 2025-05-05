import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMsgComponent } from './recent-msg.component';

describe('RecentMsgComponent', () => {
  let component: RecentMsgComponent;
  let fixture: ComponentFixture<RecentMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
