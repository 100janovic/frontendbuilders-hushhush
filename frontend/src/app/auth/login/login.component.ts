import { Component, inject, Input } from '@angular/core';
import { Login } from '../auth.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true
})
export class LoginComponent {

  @Input('redirectURL')
  url: string = '';

  public payload: Login = {
    email: "",
    password: "",
    redirectURL: ""
  }

  private store = inject(AuthStore);
  public loading = this.store.loading;

  login(payload: Login) {
    this.store.login({ ...payload, redirectURL: this.url });
  }

}
