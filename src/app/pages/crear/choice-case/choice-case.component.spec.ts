import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceCaseComponent } from './choice-case.component';

describe('ChoiceCaseComponent', () => {
  let component: ChoiceCaseComponent;
  let fixture: ComponentFixture<ChoiceCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
