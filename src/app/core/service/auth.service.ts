import { Injectable } from '@angular/core';
import { UserService } from './user.service';

interface User {
  username: string;
  password: string;
}

const SESSION_KEY = 'sessionUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'johndoe', password: 'John@1234' },
    { username: 'test', password: 'Test@1234' },
    { username: 'admin', password: 'Admin@2025!' }
  ];

  private strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&]).{8,}$/;

  constructor(private userService: UserService) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      u => u.username === username.toLowerCase() && u.password === password
    );

    if (user) {
      const { password, ...sessionUser } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      this.userService.updateProfile({ username: sessionUser.username });
      return true;
    }

    return false;
  }

  isStrongPassword(password: string): boolean {
    return this.strongPasswordRegex.test(password);
  }

  getSession(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.userService.clearProfile();
  }
}
