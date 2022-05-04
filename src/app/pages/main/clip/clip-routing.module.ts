import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClipPage } from './clip.page';

const routes: Routes = [
  {
    path: '',
    component: ClipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClipPageRoutingModule {}
