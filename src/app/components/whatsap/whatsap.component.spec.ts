import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsapComponent } from './whatsap.component';

describe('WhatsapComponent', () => {
  let component: WhatsapComponent;
  let fixture: ComponentFixture<WhatsapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
