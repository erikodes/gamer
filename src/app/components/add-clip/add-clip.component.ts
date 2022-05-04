/* eslint-disable space-before-function-paren */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentsService } from 'src/app/services/components/components.service';
import { ViewOptionsComponent } from '../view-options/view-options.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectGameComponent } from '../select-game/select-game.component';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-add-clip',
    templateUrl: './add-clip.component.html',
    styleUrls: ['./add-clip.component.scss'],
})
export class AddClipComponent implements OnInit {

    file: any;
    format: any;
    videoElement: any;
    clipForm: FormGroup;
    files: File[] = [];
    game: any = '';

    constructor(
        public modalController: ModalController,
        public components: ComponentsService,
        public formBuilder: FormBuilder,
        public api: ApiService,
        public router: Router,
        public auth: AuthService
    ) {
        this.clipForm = this.formBuilder.group({
            video: ['', [Validators.required]],
            title: ['', [Validators.required]],
            viewOption: ['all'],
            comments: [true],
            tags: [''],
            game: ['', [Validators.required]],
            userKey: [auth.user],
            likes: [0]
        });
    }

    ionViewDidEnter() {
    }

    ngOnInit() { }

    onSelectVideo(event) {
        this.files.push(...event.addedFiles);
        let file = event.addedFiles[0];

        this.api.uploadToCloudinary(file).then(data => {
            this.file = data;

            this.clipForm.controls.video.setValue({
                url: this.file.url,
                public_id: this.file.public_id
            });
        }, err => {
            this.components.showToast('Formato de imagen incorrecto.', 'error');
        })
    }

    removeVideo() {
        console.log('a');

        this.api.deleteToCloudinary(this.file).then(() => {
            this.file = '';
            this.components.showToast('Video eliminado correctamente', 'success');
        });
    }

    ionViewDidDismiss() {
        this.removeVideo();
    }

    async viewOptions() {
        const modal = await this.modalController.create({
            component: ViewOptionsComponent,
            cssClass: 'view-options-modal',
            swipeToClose: true,
            componentProps: {
                option: this.clipForm.controls.viewOption.value
            }
        });

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.clipForm.controls.viewOption.setValue(data.data);
            }
        });

        return await modal.present();
    }

    async selectGame() {
        const modal = await this.modalController.create({
            component: SelectGameComponent,
            cssClass: 'select-game--modal',
            swipeToClose: true,
            componentProps: {
                game: this.clipForm.controls.game.value
            }
        });

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.game = data.data;
                this.clipForm.controls.game.setValue(this.game.id);
            }
        });

        return await modal.present();
    }

    addClip() {
        this.clipForm.value.creationDate = new Date();
        this.api.addDocument('clips', this.clipForm.value)
            .then(() => {
                this.modalController.dismiss();
                this.router.navigateByUrl('/publish-success');
            }).catch(error => {
                console.log(error);

                this.components.showToast('Hubo un error. Intentalo de nuevo 😔');
            });

    }
}