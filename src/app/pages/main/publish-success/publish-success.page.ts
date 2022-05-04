import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { Storage } from '@ionic/storage-angular';

@Component({
    selector: 'app-publish-success',
    templateUrl: './publish-success.page.html',
    styleUrls: ['./publish-success.page.scss'],
})
export class PublishSuccessPage implements OnInit {
    confetti: any = false;

    constructor(
        private storage: Storage,
        public modalController: ModalController,
    ) { }

    async ngOnInit() {
        const storage = await this.storage.create();
        const confetti = await storage.get('confetti');

        if (confetti === true || confetti == null) {
            this.confetti = true;
        } else {
            this.confetti = false;
        }
    }
}
