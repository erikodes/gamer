import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckEmailPage } from './check-email.page';

const routes: Routes = [
  {
    path: '',
    component: CheckEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckEmailPageRoutingModule {}
