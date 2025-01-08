import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneCover2dComponent } from './iphone-cover2d.component';

describe('IphoneCover2dComponent', () => {
  let component: IphoneCover2dComponent;
  let fixture: ComponentFixture<IphoneCover2dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IphoneCover2dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IphoneCover2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
