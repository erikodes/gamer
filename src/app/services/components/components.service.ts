import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ComponentsService {

    isToastPresent = false;

    constructor(
        private toastCtrl: ToastController,
        public alertController: AlertController
    ) { }

    showAlert(title, msg, btns) {
        this.alertController.create({
            header: title,
            message: msg,
            buttons: btns
        }).then(alert => alert.present());
    }

    async showToast(message, type: any = 'success') {
        if (!this.isToastPresent) {
            let icon = '';
            if (type === 'success') {
                icon = 'checkmark-circle';
            } else {
                icon = 'close-circle';
            }
            this.isToastPresent = true;
            const toast = await this.toastCtrl.create({
                message,
                cssClass: type,
                position: 'top',
                duration: 2000,
                buttons: [
                    {
                        side: 'start',
                        role: 'cancel',
                        icon,
                        handler: () => { },
                    }
                ],
            });
            await toast.present();
            await toast.onDidDismiss().then(() => (this.isToastPresent = false));
        }
    }

}