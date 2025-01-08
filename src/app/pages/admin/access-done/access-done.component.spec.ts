import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDoneComponent } from './access-done.component';

describe('AccessDoneComponent', () => {
  let component: AccessDoneComponent;
  let fixture: ComponentFixture<AccessDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
