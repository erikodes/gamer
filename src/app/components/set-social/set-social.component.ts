import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-set-social',
    templateUrl: './set-social.component.html',
    styleUrls: ['./set-social.component.scss'],
})
export class SetSocialComponent implements OnInit {
    @ViewChild('usernameId', { static: false }) usernameInput: { setFocus: () => void };
    username: any;
    title: any;

    constructor(
        public navParams: NavParams,
        public modalController: ModalController
    ) {
        this.username = navParams.get('username');
        this.title = navParams.get('title');
    }

    ngOnInit() { }

    ionViewDidEnter() {
        this.usernameInput.setFocus();
    }

    setSocial() {

    }
}
