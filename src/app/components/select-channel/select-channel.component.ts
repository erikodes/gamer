import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { channels } from '../../../assets/json/channels';

@Component({
    selector: 'app-select-channel',
    templateUrl: './select-channel.component.html',
    styleUrls: ['./select-channel.component.scss'],
})
export class SelectChannelComponent implements OnInit {
    channels: any = channels;

    constructor(
        public modalController: ModalController
    ) {
    }

    ngOnInit() { }

    selectOption(option) {
        this.modalController.dismiss(option);
    }

    searching(ev) {
        this.channels = [];
        const query = ev.detail.value.toLowerCase();

        channels.forEach((item) => {
            const shouldShow = item.name.toLowerCase().indexOf(query) > -1;

            if (shouldShow) {
                this.channels.push(item);
            }
        });

        if (query === '') {
            this.channels = channels;
        }

    }
}
