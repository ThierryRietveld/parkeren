import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragemanagerComponent } from './garagemanager.component';

describe('GaragemanagerComponent', () => {
  let component: GaragemanagerComponent;
  let fixture: ComponentFixture<GaragemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaragemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
