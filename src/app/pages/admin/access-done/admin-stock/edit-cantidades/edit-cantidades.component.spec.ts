import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCantidadesComponent } from './edit-cantidades.component';

describe('EditCantidadesComponent', () => {
  let component: EditCantidadesComponent;
  let fixture: ComponentFixture<EditCantidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCantidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCantidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
