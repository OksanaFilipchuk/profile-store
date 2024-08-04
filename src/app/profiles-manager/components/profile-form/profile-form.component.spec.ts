import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMaskModule } from 'angular-imask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      providers: [{ provide: MatDialog, useValue: {} }],
      imports: [SharedModule, IMaskModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
