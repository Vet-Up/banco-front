import { Routes } from '@angular/router';
import { CLogin } from '../c-login/c-login';
import { CNotFound } from '../c-not-found/c-not-found';
import { gAuthGuard } from '../../../core/guards/g-auth-guard';

export const routes: Routes = [
    { path: 'login', component: CLogin },
    { path: '**', component: CNotFound, canActivate: [gAuthGuard] }
];
