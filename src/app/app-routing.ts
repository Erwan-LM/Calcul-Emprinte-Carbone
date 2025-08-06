import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Summary } from './shared/component/summary/summary';
import { Profile } from './features/profile/profile';
import { AuthGuard } from './core/guard/auth.guard';
import { ProfileGuard } from './core/guard/profil.guard';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'summary', component: Summary, canActivate: [AuthGuard] },
  { path: 'profile/:username', component: Profile, canActivate: [AuthGuard, ProfileGuard] }
];
