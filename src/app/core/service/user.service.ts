import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
}

const LOCAL_STORAGE_KEY = 'userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);

  constructor() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      this.userProfileSubject.next(JSON.parse(stored));
    }
  }

  get userProfile$(): Observable<UserProfile | null> {
    return this.userProfileSubject.asObservable();
  }

  getCurrentProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  updateProfile(profile: UserProfile): void {
    this.userProfileSubject.next(profile);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }

  clearProfile(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.userProfileSubject.next(null);
  }
}
