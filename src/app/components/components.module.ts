import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClipComponent } from './add-clip/add-clip.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ViewOptionsComponent } from './view-options/view-options.component';
import { SelectGameComponent } from './select-game/select-game.component';
import { MenuClipComponent } from './menu-clip/menu-clip.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SetSocialComponent } from './set-social/set-social.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SelectChannelComponent } from './select-channel/select-channel.component';
@NgModule({
    declarations: [
        AddClipComponent,
        ViewOptionsComponent,
        SelectGameComponent,
        MenuClipComponent,
        SetSocialComponent,
        DatePickerComponent,
        SelectChannelComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        NgxDropzoneModule,

    ],
    exports: [
        AddClipComponent,
        ViewOptionsComponent,
        SelectGameComponent,
        MenuClipComponent,
        SetSocialComponent,
        DatePickerComponent,
        SelectChannelComponent
    ]
})
export class ComponentsModule { }
