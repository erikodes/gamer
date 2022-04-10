import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    @ViewChild('usernameId', { static: false }) usernameInput: { setFocus: () => void };
    @ViewChild('passwordId', { static: false }) passwordInput: { setFocus: () => void };

    passwordType = 'password';
    passwordIcon = 'eye';
    username: any;
    password: any;

    constructor(
        public auth: AuthService,
        public router: Router,
        public components: ComponentsService
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.usernameInput.setFocus();
    }

    showPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    }

    login() {
        this.auth.logIn(this.username, this.password).then(user => {
            this.router.navigate(['/']);
        }, err => {
            this.components.showAlert('Contraseña incorrecta', 'La contraseña que ingresaste es incorrecta. Vuelve a intentarlo.',
                [
                    {
                        text: '¿Olvidaste tu contraseña?',
                        handler: () => {
                            this.router.navigateByUrl('/auth/password');
                        }
                    },
                    {
                        text: 'Intentar de nuevo',
                        role: 'cancel',
                        cssClass: 'btn-cancel'
                    }
                ],
            );
        });
    }
}
