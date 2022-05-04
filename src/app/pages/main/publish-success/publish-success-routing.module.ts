import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishSuccessPage } from './publish-success.page';

const routes: Routes = [
  {
    path: '',
    component: PublishSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishSuccessPageRoutingModule {}
