import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AccountPageRoutingModule,
        ReactiveFormsModule,
        NgxDropzoneModule
    ],
    declarations: [AccountPage]
})
export class AccountPageModule { }
