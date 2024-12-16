import { Routes } from '@angular/router';
import { SecretsCListomponent } from './secrets-list/secrets-list.component';
import { SecretFormComponent } from './secret-form/secret-form.component';

export const secretsRoutes: Routes = [
    {
        path: '',
        component: SecretsCListomponent
    },
    {
        path: 'create',
        component: SecretFormComponent
    }
];
