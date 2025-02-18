import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { IMASK_FACTORY, IMaskFactory, IMaskModule } from 'angular-imask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilesDataService } from '../../services/profiles-data.service';
import { Injectable } from '@angular/core';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  @Injectable()
  class MockIMaskFactory implements IMaskFactory {
    create(el: any, opts: any): any {
      return new MockedInputMask();
    }
  }

  class MockedInputMask {
    on(ev: string, handler: any): this {
      return this;
    }
    off(ev: string, handler?: any): this {
      return this;
    }
    updateOptions() {
      return jest.fn();
    }
    destroy() {
      return jest.fn();
    }
    value() {
      return jest.fn();
    }
    unmaskedValue() {
      return jest.fn();
    }
    typedValue() {
      return jest.fn();
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      providers: [{ provide: MatDialog }, { provide: ProfilesDataService, useClass: MockProfilesDataService }, { provide: IMASK_FACTORY, useClass: MockIMaskFactory }],
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
      jest.spyOn(component, 'onFormSubmit');

      component.checkData();
      expect(component.onFormSubmit).toHaveBeenCalled();
    });

    it('should call onFormSubmit when there is no matching profile', () => {
      jest.spyOn(component, 'onFormSubmit');

      component.checkData();
      expect(component.onFormSubmit).toHaveBeenCalled();
    });

    it('should call openConfirmDialog when there is matching profile', () => {
      jest.spyOn(component, 'openConfirmDialog');
      const mail = 'jane.doe@example.com';
      (component as any).profilesDataService.profilesStore.mail = mail;
      component.profileForm.value.mail = mail;

      component.checkData();
      expect(component.openConfirmDialog).toHaveBeenCalled();
    });

    it('should call dialog open method', () => {
      const dialogSpy = jest.spyOn((component as any).dialog, 'open');
      component.openConfirmDialog({ title: 'Some title', content: ['Content'] });
      expect(dialogSpy).toHaveBeenCalled();
    })

    it('should submit form when dialog return confirmation', () => {
      const dialogSpy = jest.spyOn((component as any).dialog, 'open').mockReturnValue({
        afterClosed: () => of(true)
      });
      const onFormSubmitSpy = jest.spyOn(component, 'onFormSubmit');

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
      const spy = jest.spyOn(component, 'onFormSubmit');
      const submitButton = fixture.nativeElement.querySelector('button');
      submitButton.dispatchEvent(new Event('click'));
      expect(spy).toHaveBeenCalled();
    });
  });
})
