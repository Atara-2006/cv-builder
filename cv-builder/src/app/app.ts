import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PersonalFormComponent, EducationFormComponent, CvPreviewComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  cvData: any = {
    personal: {},
    education: []
  };

  updatePersonalDetails(details: any) {

    this.cvData.personal = { ...details };
  }

  updateEducationDetails(educationList: any) {

    this.cvData.education = [...educationList];
  }
}