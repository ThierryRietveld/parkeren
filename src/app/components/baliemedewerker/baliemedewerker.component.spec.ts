import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaliemedewerkerComponent } from './baliemedewerker.component';

describe('BaliemedewerkerComponent', () => {
  let component: BaliemedewerkerComponent;
  let fixture: ComponentFixture<BaliemedewerkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaliemedewerkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaliemedewerkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
