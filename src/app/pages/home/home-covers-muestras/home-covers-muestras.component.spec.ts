import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoversMuestrasComponent } from './home-covers-muestras.component';

describe('HomeCoversMuestrasComponent', () => {
  let component: HomeCoversMuestrasComponent;
  let fixture: ComponentFixture<HomeCoversMuestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoversMuestrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCoversMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
