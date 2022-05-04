import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClipPageRoutingModule } from './clip-routing.module';
import { ClipPage } from './clip.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function playerFactory() {
    return player;
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClipPageRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    declarations: [ClipPage]
})
export class ClipPageModule { }
