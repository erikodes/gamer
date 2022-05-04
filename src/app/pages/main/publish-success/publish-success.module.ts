import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublishSuccessPageRoutingModule } from './publish-success-routing.module';
import { PublishSuccessPage } from './publish-success.page';
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
        PublishSuccessPageRoutingModule,
        LottieModule.forRoot({ player: playerFactory })
    ],
    declarations: [PublishSuccessPage]
})
export class PublishSuccessPageModule { }
