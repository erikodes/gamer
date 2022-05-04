import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthStateGuard implements CanActivate {

    constructor(
        private router: Router,
        public auth: AuthService
    ) { }

    canActivate(): boolean | UrlTree {
        if (!this.auth.user) { return true; }
        return this.router.parseUrl('tabs');
    }
}