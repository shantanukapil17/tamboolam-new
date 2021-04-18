import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchScreensComponent } from './switch-screens.component';

describe('SwitchScreensComponent', () => {
  let component: SwitchScreensComponent;
  let fixture: ComponentFixture<SwitchScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchScreensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
