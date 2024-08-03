import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { ProfilesDataService } from '../../services/profiles-data.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    public formService: FormService,
    private profilesDataService: ProfilesDataService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formService.createProfileForm();
  }

  onFormSubmit() {
    const id = this.profilesDataService.profilesStore.length
      ? Math.max(
          ...this.profilesDataService.profilesStore.map((user) => user.id)
        ) + 1
      : 1;
    this.profilesDataService.profilesStore.push({
      ...this.profileForm.value,
      ...{ id },
    });
    this.profilesDataService.profilesStore$.next(
      this.profilesDataService.profilesStore
    );
  }
}
