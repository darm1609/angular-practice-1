import { Component, OnInit } from '@angular/core';
import { IUserLogin } from '../../models/userLogin.model';
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

  private userLogin!: IUserLogin;

  ngOnInit(): void {

  }

  public togglePassword(): void {
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.isPasswordShown = true;
    } else {
      passwordInput.type = 'password';
      this.isPasswordShown = false;
    }
  }

  public onLogin(): void {
    console.log(this.logueo)
  }
}
