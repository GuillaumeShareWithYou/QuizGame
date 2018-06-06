import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculNotificationComponent } from './calcul-notification.component';

describe('CalculNotificationComponent', () => {
  let component: CalculNotificationComponent;
  let fixture: ComponentFixture<CalculNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
