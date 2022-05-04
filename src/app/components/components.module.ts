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
import { MenuProfileComponent } from './menu-profile/menu-profile.component';
@NgModule({
    declarations: [
        AddClipComponent,
        ViewOptionsComponent,
        SelectGameComponent,
        MenuClipComponent,
        MenuProfileComponent
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
        MenuProfileComponent
    ]
})
export class ComponentsModule { }
