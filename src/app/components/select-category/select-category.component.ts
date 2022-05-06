import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { categories } from "../../../assets/json/categories";


@Component({
    selector: 'app-select-category',
    templateUrl: './select-category.component.html',
    styleUrls: ['./select-category.component.scss'],
})
export class SelectCategoryComponent implements OnInit {

    categories: any;

    constructor(
        public modalController: ModalController
    ) {
        this.categories = categories;
    }

    ngOnInit() { }

    selectOption(option) {
        this.modalController.dismiss(option);
    }

    searching(ev) {
        this.categories = [];
        const query = ev.detail.value.toLowerCase();

        categories.forEach((item) => {
            const shouldShow = item.name.toLowerCase().indexOf(query) > -1;

            if (shouldShow) {
                this.categories.push(item);
            }
        });

        if (query === '') {
            this.categories = categories;
        }

    }

}
