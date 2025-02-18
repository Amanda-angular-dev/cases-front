import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorTopAlternativoComponent } from './contenedor-top-alternativo.component';

describe('ContenedorTopAlternativoComponent', () => {
  let component: ContenedorTopAlternativoComponent;
  let fixture: ComponentFixture<ContenedorTopAlternativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorTopAlternativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorTopAlternativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
