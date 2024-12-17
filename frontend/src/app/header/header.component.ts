import { Component, inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true
})
export class HeaderComponent {

  authStore = inject(AuthStore);

  logOut() {
    this.authStore.logout();
  }

}
