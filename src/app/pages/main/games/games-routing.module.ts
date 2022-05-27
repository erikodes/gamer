import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesPage } from './games.page';

const routes: Routes = [
    {
        path: '',
        component: GamesPage
    },
    {
        path: ':gameKey',
        loadChildren: () => import('./clips/clips.module').then(m => m.ClipsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GamesPageRoutingModule { }
