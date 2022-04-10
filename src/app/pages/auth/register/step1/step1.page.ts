import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-step1',
    templateUrl: './step1.page.html',
    styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {
    @ViewChild('usernameId', { static: false }) ionInput: { setFocus: () => void };
    username: any;

    constructor(
        public router: Router,
        public api: ApiService,
        public components: ComponentsService
    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.ionInput.setFocus();
    }

    checkUsername() {
        this.ionInput.setFocus();
        this.api.getRef('users').ref
            .where('username', '==', this.username)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    this.router.navigate(['/auth/register/step2', this.username]);
                } else {
                    this.components.showToast('El usuario que ingresaste ya esta en uso.', 'error');
                }
            });
    }

}
