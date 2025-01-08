import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorTopComponent } from './contenedor-top.component';

describe('ContenedorTopComponent', () => {
  let component: ContenedorTopComponent;
  let fixture: ComponentFixture<ContenedorTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
