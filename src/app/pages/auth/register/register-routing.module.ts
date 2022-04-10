import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
    {
        path: '',
        component: RegisterPage
    },
    {
        path: 'step1',
        loadChildren: () => import('./step1/step1.module').then(m => m.Step1PageModule)
    },
    {
        path: 'step2/:username',
        loadChildren: () => import('./step2/step2.module').then(m => m.Step2PageModule)
    },
    {
        path: 'step3/:username/:email',
        loadChildren: () => import('./step3/step3.module').then(m => m.Step3PageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterPageRoutingModule { }
