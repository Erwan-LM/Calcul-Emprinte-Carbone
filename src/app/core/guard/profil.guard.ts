import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const profile = this.userService.getCurrentProfile();
    const usernameParam = route.params['username'];
  
    if (!profile || !profile.username) {
      this.router.navigate(['/home']);
      return false;
    }
  
    if (usernameParam !== profile.username) {
      this.router.navigate(['/profile', profile.username]);
      return false;
    }
  
    return true;
  }
}  

