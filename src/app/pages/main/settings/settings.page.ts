import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(
        public auth: AuthService,
        public router: Router,
        public components: ComponentsService
    ) { }

    ngOnInit() {
    }

    logOut() {
        console.log('a');

        this.components.showAlert('Seguro que quieres cerrar la sesion?', '', [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'btn-cancel'
            },
            {
                text: 'Cerrar sesion',
                role: 'destructive',
                handler: () => {
                    this.auth.logOut().then(() => {
                        this.router.navigateByUrl('/auth');
                    })
                }
            }
        ])
    }
}
