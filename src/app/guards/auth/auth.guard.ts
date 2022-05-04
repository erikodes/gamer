import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) {
    }

    canActivate(route) {
        if (!this.auth.user) {
            this.router.navigate(['/auth']);
        }
        return true;
    }
}