import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesTableComponent } from './profiles-table.component';

describe('ProfilesTableComponent', () => {
  let component: ProfilesTableComponent;
  let fixture: ComponentFixture<ProfilesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesTableComponent]
    });
    fixture = TestBed.createComponent(ProfilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
