import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SecretsComponent } from './secrets/secrets.component';
import { secretsRoutes } from './secrets/secrets.routes';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: SecretsComponent,
        children: [
            ...secretsRoutes
        ]
    }
];
