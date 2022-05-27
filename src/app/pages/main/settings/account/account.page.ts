import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { SetSocialComponent } from 'src/app/components/set-social/set-social.component';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsService } from 'src/app/services/components/components.service';
import * as moment from 'moment';
moment.locale('es');

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    user: any;
    uploadingImage: any = false;
    uploadingBanner: any = false;
    files: File[] = [];
    file: any;
    birthdate: any;

    constructor(
        public formBuilder: FormBuilder,
        public auth: AuthService,
        public api: ApiService,
        public components: ComponentsService,
        public modalController: ModalController,
        public router: Router,
        private navCtrl: NavController
    ) {
    }

    ngOnInit() {
        this.api.getDocument('users', this.auth.user).then(data => {
            this.user = data;
            if (this.birthdate) {
                this.birthdate = moment(this.user.birthdate.toDate()).format("DD MMM YYYY");
            }
        });
    }

    updatePhoto(type, event) {
        this.files.push(...event.addedFiles);
        let file = event.addedFiles[0];

        if (type == 'profilePicture') {
            this.uploadingImage = true;
        } else {
            this.uploadingBanner = true;
        }

        this.api.uploadToCloudinary('image', file).then(data => {
            this.file = data;
            if (type == 'profilePicture') {
                this.user.profilePicture = {
                    url: this.file.url,
                    public_id: this.file.public_id
                };
                this.uploadingImage = false;
            } else {
                this.user.banner = {
                    url: this.file.url,
                    public_id: this.file.public_id
                };
                this.uploadingBanner = false;
            }
        }, err => {
            this.components.showToast('Formato de imagen incorrecto.', 'error');
            this.uploadingImage = false;
        })
    }

    saveChanges() {
        delete this.user.$key;
        this.api.updateDocument('users', this.auth.user, this.user).then(() => {
            this.navCtrl.back();
            this.components.showToast('Usuario actualizado correctamente.', 'success');
        })
    }

    setUsername(title, username) {
        this.modalController.create({
            component: SetSocialComponent,
            cssClass: 'fit-modal set-social-modal',
            swipeToClose: true,
            componentProps: {
                title,
                username
            }
        }).then(modal => {
            modal.present();
            modal.onDidDismiss().then(data => {
                if (data.data) {
                    if (title == 'Tiktok') {
                        this.user.tiktok = data.data;
                    } else if (title == 'Instagram') {
                        this.user.instagram = data.data;
                    } else {
                        this.user.twitter = data.data;
                    }
                }
            })
        });
    }

    openDatePicker() {
        this.modalController.create({
            component: DatePickerComponent,
            cssClass: 'fit-modal date-picker-modal',
            swipeToClose: true
        }).then(modal => {
            modal.present();
            modal.onDidDismiss().then(data => {
                console.log(data.data);
                if (data.data) {
                    this.user.birthdate = data.data;
                    this.birthdate = moment(data.data).format("DD MMM YYYY");
                }
            })
        });
    }
}
