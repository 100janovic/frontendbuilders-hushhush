import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Secret } from '../secrets.model';
import { SecretsStore } from '../secrets.store';

@Component({
    selector: 'app-secret-form',
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './secret-form.component.html',
    standalone: true
})
export class SecretFormComponent {

    @Input('secret')
    secret: Secret = {
        slug: "",
        value: ""
    };

    public store = inject(SecretsStore);
    public loading = this.store.loading;

    update(payload: Secret) {
        this.store.addSecret(payload);
    }

}
