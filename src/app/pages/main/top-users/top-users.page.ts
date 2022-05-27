import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-top-users',
    templateUrl: './top-users.page.html',
    styleUrls: ['./top-users.page.scss'],
})
export class TopUsersPage implements OnInit {

    users: any = [];

    constructor(
        public api: ApiService
    ) {
        api.getRef('users').ref
            .limit(10)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const user = element.data();
                    user.$key = element.id;
                    console.log(user);

                    this.users.push(user);
                });
            });
    }

    ngOnInit() {
    }

}
