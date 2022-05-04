import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function playerFactory() {
    return player;
}

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    declarations: [Tab1Page]
})
export class Tab1PageModule { }
