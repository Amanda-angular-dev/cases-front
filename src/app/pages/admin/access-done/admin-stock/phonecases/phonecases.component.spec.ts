import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonecasesComponent } from './phonecases.component';

describe('PhonecasesComponent', () => {
  let component: PhonecasesComponent;
  let fixture: ComponentFixture<PhonecasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonecasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonecasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
