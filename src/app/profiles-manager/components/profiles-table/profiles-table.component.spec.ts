import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesTableComponent } from './profiles-table.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

describe('ProfilesTableComponent', () => {
  let component: ProfilesTableComponent;
  let fixture: ComponentFixture<ProfilesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesTableComponent],
      providers: [{ provide: MatDialog, useValue: {} }],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(ProfilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
