import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  cities = ['Kyiv', 'Lviv', 'Dnipro', 'Odesa', 'Kharkiv', 'Zaporizhzhia'];
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.profileForm = this.formService.createProfileForm();
  }

  onFormSubmit() {
    console.log(this.profileForm.value);
  }
}
