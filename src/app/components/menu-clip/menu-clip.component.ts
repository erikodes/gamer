import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-menu-clip',
    templateUrl: './menu-clip.component.html',
    styleUrls: ['./menu-clip.component.scss'],
})
export class MenuClipComponent implements OnInit {

    constructor(
        public modalController: ModalController,
    ) { }

    ngOnInit() { }

    addFavorite() {
        console.log('a');

    }
}
