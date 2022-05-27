import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddClipComponent } from 'src/app/components/add-clip/add-clip.component';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(
        public modalController: ModalController
    ) { }

    async addClip() {
        const modal = await this.modalController.create({
            component: AddClipComponent,
            swipeToClose: true,
            showBackdrop: false
        });
        return await modal.present();
    }
}
