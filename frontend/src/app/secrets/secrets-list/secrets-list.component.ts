import { Component, inject, OnInit } from "@angular/core";
import { SecretsStore } from "./../secrets.store";

@Component({
    selector: 'app-secrets-list',
    templateUrl: './secrets-list.component.html',
    standalone: true
})
export class SecretsCListomponent implements OnInit {
    secretsStore = inject(SecretsStore);
    ngOnInit(): void {
        this.secretsStore.getSecrets();
    }
}