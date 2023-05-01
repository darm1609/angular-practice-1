import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-practice-1';
  isPasswordShown = false;

  logueo = {
    email: '',
    password: ''
  }

  togglePassword() {
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.isPasswordShown = true;
    } else {
      passwordInput.type = 'password';
      this.isPasswordShown = false;
    }
  }

  onLogin() {
    console.log(this.logueo)
  }
}
