import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-check-email',
    templateUrl: './check-email.page.html',
    styleUrls: ['./check-email.page.scss'],
})
export class CheckEmailPage implements OnInit {

    email: any;
    counter: any = 60;

    constructor(
        private auth: AuthService,
        public components: ComponentsService,
        public activeRoute: ActivatedRoute
    ) {
        this.email = this.activeRoute.snapshot.paramMap.get('email');
    }

    ngOnInit() {
        this.setCountdown();
    }

    async openEmail() {
        this.components.showAlert('Abrir correo electrónico', '¿Qué aplicación te gustaria abrir?',
            [
                {
                    text: 'Mail',
                    handler: () => {
                        // this.router.navigateByUrl('https://');
                    }
                },
                {
                    text: 'Gmail',
                    handler: () => {
                        // this.router.navigateByUrl('https://googlegmail://');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]);
    }

    sendInstructions() {
        this.auth.resetPassword(this.email).then(() => {
            this.components.showAlert(
                'Enlace enviado por correo electrónico',
                'Enviamos un correo electrónico a ' + this.email + ' con un enlace para que recuperes el acceso a tu cuenta.',
                ['Aceptar']);
        }, err => {
            this.components.showAlert('Error', 'El correo eletrónico que ingresaste no coincide con ningun usuario.', ['Aceptar']);
        });
    }

    setCountdown() {
        setTimeout(() => {
            if (this.counter === 0) {
                this.counter = 60;
            } else {
                this.counter -= 1;
                this.setCountdown();
            }
        }, 1000);
    }

}
