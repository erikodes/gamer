import { Component } from '@angular/core';
import { games } from "../../../../assets/json/games";
import { categories } from "../../../../assets/json/categories";
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    users: any = [];
    games: any = [];
    categories: any = [];
    slide: any = 0;
    slideOpts = {
        slidesPerView: 'auto',
        initialSlide: 1,
        centeredSlides: true,
        spaceBetween: 20
    }
    constructor(
        public api: ApiService
    ) {
        this.categories = categories;
        games.forEach(country => {
            if (this.games.length < 10) {
                this.games.push({
                    id: country.dial_code,
                    art: country.art,
                    name: country.name
                })
            }
        })

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
