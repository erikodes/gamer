import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopUsersPage } from './top-users.page';

const routes: Routes = [
  {
    path: '',
    component: TopUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopUsersPageRoutingModule {}
