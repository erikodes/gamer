import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-followers',
    templateUrl: './followers.page.html',
    styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

    users: any = [];

    constructor(
        public api: ApiService,
        public auth: AuthService,
        public actvRoute: ActivatedRoute
    ) {
        const userKey = this.actvRoute.snapshot.paramMap.get('userKey');

        api.getRef(`users/${userKey}/followers`).ref
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    api.getDocument('users', element.id).then(data => {
                        this.users.push(data);
                    });
                });
            });
    }

    ngOnInit() {
    }

}
