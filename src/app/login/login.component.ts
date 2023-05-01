import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'angular-practice-1';
  isPasswordShown = false;

  logueo = {
    email: '',
    password: ''
  }

  ngOnInit(): void {

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
