import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { Login } from '../auth.models';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true
})
export class RegisterComponent extends LoginComponent {

  register(payload: Login) {
    this.store.register({ ...payload, redirectURL: this.url });
  }

}
