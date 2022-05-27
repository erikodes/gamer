import { Component } from '@angular/core';
import { games } from '../../../../assets/json/games';
import { channels } from '../../../../assets/json/channels';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    users: any = [];
    games: any = games;
    channels: any = channels;
    slide: any = 0;
    slideOpts = {
        slidesPerView: 'auto',
        initialSlide: 1,
        centeredSlides: true,
        spaceBetween: 13
    };

    constructor(
        public api: ApiService,
        public auth: AuthService
    ) {
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

    slideChange(slides) {
        slides.getActiveIndex().then(index => {
            this.slide = index;
        });
    }
}
