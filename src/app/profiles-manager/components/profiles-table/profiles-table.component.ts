import { Component, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../../models';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ProfilesDataService } from '../../services/profiles-data.service';
import { Subject, combineLatest, fromEvent, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profiles-table',
  templateUrl: './profiles-table.component.html',
  styleUrls: ['./profiles-table.component.scss'],
})
export class ProfilesTableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  profileToEdit: Profile | null;
  profiles: Profile[] = [];
  profilesFiltered: Profile[] = [...this.profiles];
  editProfileForm: FormGroup;
  searchInput = new FormControl();

  constructor(
    public formService: FormService,
    private profilesDataService: ProfilesDataService
  ) {}

  ngOnInit(): void {
    this.editProfileForm = this.formService.createProfileForm();

    combineLatest([
      this.searchInput.valueChanges.pipe(startWith('')),
      this.profilesDataService.profilesStore$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([searchInput, profilesStore]) => {
        this.profiles = profilesStore;
        this.profilesFiltered = this.profiles.filter(
          (el) =>
            `${el.firstName} ${el.lastName}`
              .toLocaleLowerCase()
              .includes(searchInput.toLowerCase()) ||
            `${el.lastName} ${el.firstName}`
              ?.toLocaleLowerCase()
              .includes(searchInput.toLowerCase())
        );
      });
  }

  editProfile(profile: Profile) {
    this.profileToEdit = profile;
    this.editProfileForm.patchValue(profile);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
