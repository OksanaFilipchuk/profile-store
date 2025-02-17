import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMaskModule } from 'angular-imask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilesDataService } from '../../services/profiles-data.service';
import { By } from '@angular/platform-browser';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  class MockFormService {
    createProfileForm() {
      return {
        value: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '1234567890',
          mail: 'john.doe@example.com',
          city: 'City'
        }
      };
    }
  }

  class MockProfilesDataService {
    profilesStore = [
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '0987654321',
        mail: 'jane.doe@example.com'
      }
    ];
    profilesStore$ = {
      next: (store: any) => { }
    };
  }

  class MockMatDialog {
    open() {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      providers: [{ provide: MatDialog }, { provide: ProfilesDataService, useClass: MockProfilesDataService }],
      imports: [SharedModule, IMaskModule, BrowserAnimationsModule, ReactiveFormsModule, MatDialogModule],
    });
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('logic tests', () => {
    it('should submit the form and add new profile', () => {
      const initialProfilesCount = (component as any).profilesDataService.profilesStore.length;

      component.onFormSubmit();
      expect((component as any).profilesDataService.profilesStore.length).toBe(initialProfilesCount + 1);
    });

    it('should check is there a profile with the same data and trigger onFormSubmit', () => {
      spyOn(component, 'onFormSubmit');

      component.checkData();
      expect(component.onFormSubmit).toHaveBeenCalled();
    });

    it('should call onFormSubmit when there is no matching profile', () => {
      spyOn(component, 'onFormSubmit');

      component.checkData();
      expect(component.onFormSubmit).toHaveBeenCalled();
    });

    it('should call openConfirmDialog when there is matching profile', () => {
      spyOn(component, 'openConfirmDialog');
      const mail = 'jane.doe@example.com';
      (component as any).profilesDataService.profilesStore.mail = mail;
      component.profileForm.value.mail = mail;

      component.checkData();
      expect(component.openConfirmDialog).toHaveBeenCalled();
    });

    it('should call dialog open method', () => {
      const dialogSpy = spyOn((component as any).dialog, 'open').and.callThrough();
      component.openConfirmDialog({title:'Some title', content: ['Content']});
      expect(dialogSpy).toHaveBeenCalled();
    })

    it('should submit form when dialog return confirmation', () => {
      const dialogSpy = spyOn((component as any).dialog, 'open').and.returnValue({
        afterClosed: () => of(true)
      });
      const onFormSubmitSpy = spyOn(component, 'onFormSubmit');
      
      component.openConfirmDialog({ title: 'Some title', content: ['Content'] });
    
      expect(dialogSpy).toHaveBeenCalled();
      
      expect(onFormSubmitSpy).toHaveBeenCalled();
    })
  });

  describe('UI tests', () => {
    it('should render the profile form correctly', () => {
      const formElement = fixture.nativeElement.querySelector('form');
      expect(formElement).toBeTruthy();
    });

    it('should display the correct form data', () => {
      component.profileForm.setValue({
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '+380987654321',
        mail: 'jane.doe@example.com',
        address: 'some street',
        city: 'New York'
      });
      fixture.detectChanges();

      const firstNameInput = fixture.nativeElement.querySelector('input');
      expect(firstNameInput.value).toBe('Jane');
    });

    it('should trigger onFormSubmit when submit button is clicked', () => {
      const spy = spyOn(component, 'onFormSubmit');
      const submitButton = fixture.nativeElement.querySelector('button');
      submitButton.dispatchEvent(new Event('click'));
      expect(spy).toHaveBeenCalled();
    });
  });
})
