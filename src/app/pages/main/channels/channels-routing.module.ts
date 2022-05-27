import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelsPage } from './channels.page';

const routes: Routes = [
    {
        path: '',
        component: ChannelsPage
    },
    {
        path: ':channelKey',
        loadChildren: () => import('./clips/clips.module').then(m => m.ClipsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChannelsPageRoutingModule { }
