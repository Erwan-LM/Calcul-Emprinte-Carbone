import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const profile = this.userService.getCurrentProfile();
  
    if (
      profile &&
      profile.username &&
      profile.firstName &&
      profile.lastName &&
      profile.email
    ) {
      return true;
    } else {
      this.router.navigate(['/profile']);
      return false;
    }
  }  
}
