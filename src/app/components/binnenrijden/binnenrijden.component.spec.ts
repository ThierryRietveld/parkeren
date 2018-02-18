import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinnenrijdenComponent } from './binnenrijden.component';

describe('BinnenrijdenComponent', () => {
  let component: BinnenrijdenComponent;
  let fixture: ComponentFixture<BinnenrijdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinnenrijdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinnenrijdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
