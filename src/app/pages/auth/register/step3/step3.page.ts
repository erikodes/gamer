import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-step3',
    templateUrl: './step3.page.html',
    styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {
    @ViewChild('passwordId', { static: false }) passwordInput: { setFocus: () => void };
    @ViewChild('verifydId', { static: false }) verifyInput: { setFocus: () => void };

    passwordType = 'password';
    passwordIcon = 'eye';
    username: any;
    email: any;
    password: any;
    verifyPassword: any;

    constructor(
        private activeRoute: ActivatedRoute,
        public auth: AuthService,
        public components: ComponentsService,
        public router: Router
    ) {
        this.username = this.activeRoute.snapshot.paramMap.get('username');
        this.email = this.activeRoute.snapshot.paramMap.get('email');
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.passwordInput.setFocus();
    }

    showPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    }

    createUser() {
        if (this.password !== this.verifyPassword) {
            this.components.showToast('Las contraseñas no coinciden.', 'error');
            // this.components.dismissLoader();
        } else {
            this.auth.registerUser(this.username, this.email, this.password).then(data => {
                this.router.navigate(['']);
            }, err => {
                if (err === 'userx02') {
                    this.components.showToast('El correo electrónico que ingresaste ya esta en uso.', 'error');
                }
            });
        }
    }
}
