import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProfilesManagerModule } from './profiles-manager/profiles-manager.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ProfilesManagerModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
