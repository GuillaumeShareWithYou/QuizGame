import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculMenuComponent } from './calcul-menu.component';

describe('CalculMenuComponent', () => {
  let component: CalculMenuComponent;
  let fixture: ComponentFixture<CalculMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
