import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSearch } from './appointment-search';

describe('AppointmentSearch', () => {
  let component: AppointmentSearch;
  let fixture: ComponentFixture<AppointmentSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
