import { Component, inject } from "@angular/core";
import { AuthStore } from "../auth/auth.store";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-secrets',
    templateUrl: './secrets.component.html',
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class SecretsComponent {
    authStore = inject(AuthStore);
}