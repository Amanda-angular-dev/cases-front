import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlternativoComponent } from './header-alternativo.component';

describe('HeaderAlternativoComponent', () => {
  let component: HeaderAlternativoComponent;
  let fixture: ComponentFixture<HeaderAlternativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAlternativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAlternativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
