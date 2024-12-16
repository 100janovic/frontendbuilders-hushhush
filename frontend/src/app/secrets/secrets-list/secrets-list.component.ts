import { Component, inject, OnInit } from "@angular/core";
import { SecretsStore } from "./../secrets.store";
import copy from 'copy-to-clipboard';

@Component({
    selector: 'app-secrets-list',
    templateUrl: './secrets-list.component.html',
    standalone: true,
    imports: []
})
export class SecretsCListomponent implements OnInit {
    secretsStore = inject(SecretsStore);

    ngOnInit(): void {
        this.secretsStore.getSecrets();
    }

    copySecret(value: string) {
        copy(value);
    }

    deleteSecret(id?: number) {
        this.secretsStore.deleteSecret(id as number);
    }
}