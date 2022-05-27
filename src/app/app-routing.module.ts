import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthStateGuard } from './guards/auth-state/auth-state.guard.spec';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'auth',
        canActivate: [AuthStateGuard],
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
    },
    {
        path: 'publish-success',
        loadChildren: () => import('./pages/main/publish-success/publish-success.module').then(m => m.PublishSuccessPageModule)
    },
    {
        path: 'profile/:userKey',
        loadChildren: () => import('./pages/main/profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'clip/:clipKey',
        loadChildren: () => import('./pages/main/clip/clip.module').then(m => m.ClipPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/main/settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'top-users',
        loadChildren: () => import('./pages/main/top-users/top-users.module').then(m => m.TopUsersPageModule)
    },
    {
        path: 'channels',
        loadChildren: () => import('./pages/main/channels/channels.module').then(m => m.ChannelsPageModule)
    },
    {
        path: 'followers/:userKey',
        loadChildren: () => import('./pages/main/followers/followers.module').then(m => m.FollowersPageModule)
    },
    {
        path: 'games',
        loadChildren: () => import('./pages/main/games/games.module').then(m => m.GamesPageModule)
    },
  {
    path: 'search',
    loadChildren: () => import('./pages/main/search/search.module').then( m => m.SearchPageModule)
  }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
