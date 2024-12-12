import { Component, inject } from "@angular/core";
import { AuthStore } from "../auth/auth.store";
import { SecretsCListomponent } from "./secrets-list/secrets-list.component";

@Component({
    selector: 'app-secrets',
    templateUrl: './secrets.component.html',
    standalone: true,
    imports: [
        SecretsCListomponent
    ]
})
export class SecretsComponent {
    authStore = inject(AuthStore);
}