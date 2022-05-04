import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-view-options',
    templateUrl: './view-options.component.html',
    styleUrls: ['./view-options.component.scss'],
})
export class ViewOptionsComponent implements OnInit {

    option: any;

    constructor(
        public modalController: ModalController,
        public navParams: NavParams
    ) {
        this.option = this.navParams.get('option');
    }

    ngOnInit() { }

    selectOption(option) {
        this.modalController.dismiss(option);
    }
}
