import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitrijdenComponent } from './uitrijden.component';

describe('UitrijdenComponent', () => {
  let component: UitrijdenComponent;
  let fixture: ComponentFixture<UitrijdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitrijdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitrijdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
