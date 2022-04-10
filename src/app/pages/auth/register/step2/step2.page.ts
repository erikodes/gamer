import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ComponentsService } from 'src/app/services/components/components.service';

@Component({
    selector: 'app-step2',
    templateUrl: './step2.page.html',
    styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {
    @ViewChild('emailId', { static: false }) ionInput: { setFocus: () => void };
    username: any;
    email: any;
    constructor(
        private activeRoute: ActivatedRoute,
        public router: Router,
        public api: ApiService,
        public components: ComponentsService
    ) {
        this.username = this.activeRoute.snapshot.paramMap.get('username');
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.ionInput.setFocus();
    }

    validateEmail(email) {
        // eslint-disable-next-line max-len
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    checkEmail() {
        this.ionInput.setFocus();
        this.api.getRef('users').ref
            .where('email', '==', this.email)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    this.router.navigate(['/auth/register/step3', this.username, this.email]);
                } else {
                    this.components.showToast('El email que ingresaste ya esta en uso.', 'error');
                }
            });
    }
}
