import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfilesTableComponent } from './components/profiles-table/profiles-table.component';

import { IMaskModule } from 'angular-imask';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfilesTableComponent, ProfileFormComponent],
  imports: [CommonModule, IMaskModule, SharedModule],
  exports: [ProfilesTableComponent, ProfileFormComponent],
})
export class ProfilesManagerModule {}
