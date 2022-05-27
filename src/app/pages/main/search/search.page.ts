import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    @ViewChild('searchInput', { static: false }) ionInput: { setFocus: () => void };

    constructor() { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.ionInput.setFocus();
    }
}
