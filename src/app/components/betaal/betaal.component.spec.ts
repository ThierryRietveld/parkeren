import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaalComponent } from './betaal.component';

describe('BetaalComponent', () => {
  let component: BetaalComponent;
  let fixture: ComponentFixture<BetaalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
