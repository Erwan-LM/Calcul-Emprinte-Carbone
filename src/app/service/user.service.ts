import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string = "";

  constructor() { }

  login(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.username = username;
      resolve();
    });
  }

  getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(this.username);
    });
  }
}