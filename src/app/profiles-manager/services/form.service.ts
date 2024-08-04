import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  cities = ['Kyiv', 'Lviv', 'Dnipro', 'Odesa', 'Kharkiv', 'Zaporizhzhia'];
  constructor(private fb: FormBuilder) {}

  createProfileForm(): FormGroup {
    return this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      mail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      address: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
