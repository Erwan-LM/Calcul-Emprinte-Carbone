import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { ProfileComponent } from './profile/profile.component';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [{path: '', component: HomeComponent}, {path: 'summary', component: SummaryComponent, canActivate: [UserGuard]}, {path: 'profile/:username', component: ProfileComponent, canActivate: [UserGuard]}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }