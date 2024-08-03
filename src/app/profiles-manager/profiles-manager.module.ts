import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfilesTableComponent } from './components/profiles-table/profiles-table.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [ProfilesTableComponent, ProfileFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    IMaskModule,
    MatButtonModule,
  ],
  exports: [ProfilesTableComponent, ProfileFormComponent, MatIconModule],
})
export class ProfilesManagerModule {}
