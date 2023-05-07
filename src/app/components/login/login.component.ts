import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ILogin } from '../../models/login.model';
import { IUserLogin } from '../../models/userLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'angular-practice-1';
  isPasswordShown: boolean = false;
  noValidForm: boolean | null = null;

  public loginForm: FormGroup;

  public logueo: ILogin = {
    email: '',
    password: ''
  };

  private userLogin!: IUserLogin;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

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

    this.noValidForm = false;

    this.loginForm.setValue({
      email: this.logueo.email,
      password: this.logueo.password
    });

    if (!this.loginForm.valid) {
      this.noValidForm = true;
      return;
    }

    this.usersService.onLogin(this.logueo).subscribe({
      next: (data: IUserLogin) => {
        console.log(data);
        this.usersService.saveLoginData(data);
      },
      error: () => {
        this.noValidForm = true;
      },
      complete: () => {
        // código para manejar la finalización de la llamada al servicio
      }
    });
  }
}
