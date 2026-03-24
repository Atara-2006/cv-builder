import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * הסבר בחירת סוג טופס (דרישת חובה בתרגיל):
 * קומפוננטה זו ממומשת באמצעות Template Driven Form.
 * נימוק: זהו טופס פשוט עם שדות קבועים, ללא צורך בשינויים דינאמיים במבנה בזמן ריצה, 
 * ולכן שיטה זו מהירה ונוחה יותר למימוש.
 */
@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-form.component.html'
})
export class PersonalFormComponent {
  @Output() personalUpdate = new EventEmitter<any>();

  personalDetails = {
    fullName: '',
    email: '',
    phone: '',
    summary: ''
  };

  onUpdate() {
    this.personalUpdate.emit(this.personalDetails);
  }
}