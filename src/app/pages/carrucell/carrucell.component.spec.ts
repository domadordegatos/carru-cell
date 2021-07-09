import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrucellComponent } from './carrucell.component';

describe('CarrucellComponent', () => {
  let component: CarrucellComponent;
  let fixture: ComponentFixture<CarrucellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrucellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrucellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
