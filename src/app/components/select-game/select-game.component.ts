import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { games } from "../../../assets/json/games";

@Component({
    selector: 'app-select-game',
    templateUrl: './select-game.component.html',
    styleUrls: ['./select-game.component.scss'],
})
export class SelectGameComponent implements OnInit {

    games: any;

    constructor(
        public modalController: ModalController
    ) {
        this.games = games;
    }

    ngOnInit() { }

    selectOption(option) {
        this.modalController.dismiss(option);
    }

    searching(ev) {
        this.games = [];
        const query = ev.detail.value.toLowerCase();

        games.forEach((item) => {
            const shouldShow = item.name.toLowerCase().indexOf(query) > -1;

            if (shouldShow) {
                this.games.push(item);
            }
        });

        if (query === '') {
            this.games = games;
        }

    }
}
