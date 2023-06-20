import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleEventReqComponent } from './handle-event-req.component';

describe('HandleEventReqComponent', () => {
  let component: HandleEventReqComponent;
  let fixture: ComponentFixture<HandleEventReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleEventReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleEventReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
