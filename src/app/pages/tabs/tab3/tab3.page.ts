import { Component } from '@angular/core';
import { games } from '../../../../assets/json/games';
import { channels } from '../../../../assets/json/channels';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';
moment.locale('es');
@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    users: any = [];
    games: any = [];
    channels: any = channels;

    constructor(
        public api: ApiService
    ) {
        games.forEach(country => {
            if (this.games.length < 10) {
                this.games.push({
                    id: country.dial_code,
                    art: country.art,
                    name: country.name
                });
            }
        });

        api.getRef('users').ref
            .limit(5)
            .get()
            .then(snapshots => {
                snapshots.forEach(element => {
                    const user = element.data();
                    user.$key = element.id;
                    this.users.push(user);
                });
            });
    }

}
