import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/userLogin.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'angular-practice-1';
  isPasswordShown = false;

  public logueo = {
    email: '',
    password: ''
  }

  private userLogin: UserLogin = {
    success: true,
    token: ''
  }

  ngOnInit(): void {

  }

  public togglePassword() {
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.isPasswordShown = true;
    } else {
      passwordInput.type = 'password';
      this.isPasswordShown = false;
    }
  }

  public onLogin() {
    console.log(this.logueo)
  }
}
