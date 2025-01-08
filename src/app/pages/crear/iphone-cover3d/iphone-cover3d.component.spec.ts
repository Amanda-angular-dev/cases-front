import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneCover3dComponent } from './iphone-cover3d.component';

describe('IphoneCover3dComponent', () => {
  let component: IphoneCover3dComponent;
  let fixture: ComponentFixture<IphoneCover3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IphoneCover3dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IphoneCover3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
