export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string; // תעודה / תואר ראשון וכו'
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean; // "לומדת כרגע"
  grade: number;
  courses: string[];
  isHonors: boolean;
  description: string;
}

export interface CVData {
  personal: PersonalDetails;
  education: EducationItem[];
}