import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopUsersPageRoutingModule } from './top-users-routing.module';

import { TopUsersPage } from './top-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopUsersPageRoutingModule
  ],
  declarations: [TopUsersPage]
})
export class TopUsersPageModule {}
