import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { ProfilesDataService } from '../../services/profiles-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData, SameProfile } from '../../models';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    public formService: FormService,
    private profilesDataService: ProfilesDataService,
    private dialog: MatDialog
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

  checkData() {
    const sameProfile: SameProfile = {
      name:
        this.profilesDataService.profilesStore.find(
          (el) =>
            el.lastName === this.profileForm.value.lastName &&
            el.firstName === this.profileForm.value.firstName
        ) || null,
      phone:
        this.profilesDataService.profilesStore.find(
          (el) => el.phone === this.profileForm.value.phone
        ) || null,
      mail:
        this.profilesDataService.profilesStore.find(
          (el) => el.mail === this.profileForm.value.mail
        ) || null,
    };

    if (Object.values(sameProfile).some((value) => !!value)) {
      const content = Object.keys(sameProfile).reduce((acc: string[], key) => {
        const profile = sameProfile[key as keyof SameProfile];
        if (profile) {
          const line = `same ${key}: ${profile.firstName || ''} ${
            profile.lastName || ''
          } ${profile.phone || ''} ${profile.mail || ''} ${profile.city || ''}`;
          acc.push(line);
        }
        return acc;
      }, []);
      const data = {
        title:
          'A profile with the same data already exists. Would you like to continue?',
        content,
      };
      this.openConfirmDialog(data);
    } else {
      this.onFormSubmit();
    }
  }

  openConfirmDialog(data: DialogData) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data,
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.onFormSubmit();
        }
      });
  }
}
