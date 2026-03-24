import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFormComponent } from './personal-form.component';

describe('PersonalForm', () => {
  let component: PersonalFormComponent;
  let fixture: ComponentFixture<PersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
