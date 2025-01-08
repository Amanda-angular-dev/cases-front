import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesplegadoComponent } from './menu-desplegado.component';

describe('MenuDesplegadoComponent', () => {
  let component: MenuDesplegadoComponent;
  let fixture: ComponentFixture<MenuDesplegadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDesplegadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDesplegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
