import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.page.html',
    styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
    @ViewChild('emailId', { static: false }) emailInput: { setFocus: () => void };
    email: any;

    constructor(
        public components: ComponentsService,
        public auth: AuthService,
        public router: Router
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.emailInput.setFocus();
    }

    sendInstructions() {
        this.auth.resetPassword(this.email).then(() => {
            this.router.navigate(['/auth/check-email', { email: this.email }]);
            // eslint-disable-next-line max-len
            this.components.showAlert('Enlace enviado por correo electrónico', 'Enviamos un correo electrónico a ' + this.email + ' con un enlace para que recuperes el acceso a tu cuenta.', ['Aceptar']);
        }, err => {
            this.components.showAlert('Error', 'El correo eletrónico que ingresaste no coincide con ningun usuario.', ['Aceptar']);
        });
    }
}
