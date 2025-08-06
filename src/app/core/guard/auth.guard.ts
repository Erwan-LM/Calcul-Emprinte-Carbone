import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const sessionUser = this.authService.getSession();

    if (sessionUser && sessionUser.username) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
