import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculGameComponent } from './calcul-game.component';

describe('CalculGameComponent', () => {
  let component: CalculGameComponent;
  let fixture: ComponentFixture<CalculGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
