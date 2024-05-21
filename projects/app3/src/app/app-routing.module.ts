import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from '../../../login/src/public-api';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.auth';

const routes: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
