import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintaincePageComponent } from './maintaince-page.component';

describe('MaintaincePageComponent', () => {
  let component: MaintaincePageComponent;
  let fixture: ComponentFixture<MaintaincePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintaincePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintaincePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
