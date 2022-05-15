import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
    day: any;
    date: any;
    yearValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    constructor(
        public modalController: ModalController
    ) { }

    ngOnInit() { }

    hola() {
        console.log(new Date(this.day).getFullYear());
        let birthdate = new Date(this.date).setDate(new Date(this.day).getFullYear());
        this.modalController.dismiss(new Date(birthdate));
    }
}
