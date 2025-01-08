import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCantidadComponent } from './agregar-cantidad.component';

describe('AgregarCantidadComponent', () => {
  let component: AgregarCantidadComponent;
  let fixture: ComponentFixture<AgregarCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
