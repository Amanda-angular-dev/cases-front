import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeButtonCaseComponent } from './personalize-button-case.component';

describe('PersonalizeButtonCaseComponent', () => {
  let component: PersonalizeButtonCaseComponent;
  let fixture: ComponentFixture<PersonalizeButtonCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeButtonCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizeButtonCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
