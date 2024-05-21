import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let userData: any = localStorage.getItem('userId')
        if (!userData) {
            return true;
        }

        this.router.navigate(['/dashboard'])
        return false;
    }
}