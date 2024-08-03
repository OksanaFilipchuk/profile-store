import { Injectable } from '@angular/core';
import { Profile } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilesDataService {
  profilesStore$: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>(
    []
  );
  constructor() {}

  get profilesStore() {
    return this.profilesStore$.getValue();
  }
}
