import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * הסבר בחירת סוג טופס :
 * קומפוננטה זו ממומשת כ-Reactive Form כדי לאפשר ניהול דינמי של מערכים (השכלה וקורסים)
 * ומימוש ולידציות מורכבות בין שדות.
 */
@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {
  @Output() educationUpdate = new EventEmitter<any[]>();
  educationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      educationItems: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addEducation(); 
    this.educationForm.valueChanges.subscribe(value => {
      this.educationUpdate.emit(value.educationItems);
    });
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    const isCurrent = group.get('isCurrent')?.value;

    if (isCurrent) return null; 
    if (start && end && new Date(start) >= new Date(end)) {
      return { dateInvalid: true };
    }
    return null;
  }

  createEducationItem(): FormGroup {
    const item = this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      field: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCurrent: [false],
      average: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // טווח 0-100 [cite: 69]

      isHonors: [false],
      description: [''],
      courses: this.fb.array([], Validators.required) // לפחות קורס אחד חובה [cite: 66]
    }, { validators: this.dateRangeValidator });

    item.get('isCurrent')?.valueChanges.subscribe(isCurrent => {
      const endDateControl = item.get('endDate');
      if (isCurrent) {
        endDateControl?.clearValidators();
        endDateControl?.setValue('');
      } else {
        endDateControl?.setValidators([Validators.required]);
      }
      endDateControl?.updateValueAndValidity();
    });

    return item;
  }

  get educationItems() {
    return this.educationForm.get('educationItems') as FormArray;
  }

  addEducation() {
    this.educationItems.push(this.createEducationItem());
  }

  removeEducation(index: number) {
    if (this.educationItems.length > 1) {
      this.educationItems.removeAt(index);
    }
  }

  getCourses(index: number) {
    return this.educationItems.at(index).get('courses') as FormArray;
  }

  addCourse(eduIndex: number, courseInput: HTMLInputElement) {
    const value = courseInput.value.trim();
    if (value) {
      this.getCourses(eduIndex).push(this.fb.control(value, Validators.required));
      courseInput.value = '';
    }
  }

  removeCourse(eduIndex: number, courseIndex: number) {
    this.getCourses(eduIndex).removeAt(courseIndex);
  }
}
