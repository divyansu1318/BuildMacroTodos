import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../../../login/src/public-api';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.auth';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
