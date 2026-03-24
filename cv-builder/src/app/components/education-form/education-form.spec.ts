import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFormComponent } from './education-form.component';

describe('EducationForm', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
