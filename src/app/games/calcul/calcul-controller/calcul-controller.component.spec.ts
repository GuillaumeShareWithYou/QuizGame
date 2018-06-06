import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculControllerComponent } from './calcul-controller.component';

describe('CalculControllerComponent', () => {
  let component: CalculControllerComponent;
  let fixture: ComponentFixture<CalculControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
