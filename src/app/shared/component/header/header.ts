import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { AuthService } from '../../../core/service/auth.service';
import { Subject, takeUntil, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  nomUtilisateur: string | null = null;
  afficherHeader = true;

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userService.userProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.nomUtilisateur = profile?.username ?? null;
      });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.afficherHeader = event.url !== '/' && event.url !== '/home';
      });
  }

  logout(): void {
    this.authService.logout();
    this.userService.clearProfile();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
