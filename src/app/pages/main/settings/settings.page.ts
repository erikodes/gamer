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

        this.components.showAlert('Log Out', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'btn-cancel'
            },
            {
                text: 'Log Out',
                role: 'destructive',
                handler: () => {
                    this.auth.logOut().then(() => {
                        window.location.assign('/auth');
                    })
                }
            }
        ])
    }
}
