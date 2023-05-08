import { UsersService } from '../../services/login/users.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ILogin } from '../../models/login.model';
import { IUserLogin } from '../../models/userLogin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public title = 'angular-practice-1';
  public isPasswordShown = false;
  public isLoading = false;
  public noValidForm: boolean | null = null;
  public rememberMe = false;

  public loginForm: FormGroup;

  public logueo: ILogin = {
    email: '',
    password: ''
  };

  private userLogin!: IUserLogin;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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

  public checkFormAndLoading(): boolean {
    this.loginForm.setValue({
      email: this.logueo.email,
      password: this.logueo.password
    });

    if ((this.loginForm.valid && this.isLoading) ||
          this.loginForm.invalid) {
      return true;
    }

    return false;
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

    this.isLoading = true;
    this.usersService.onLogin(this.logueo).subscribe({
      next: (data: IUserLogin) => {
        console.log(data);
        if (!data.success) {
          this.noValidForm = true;
          return
        }
        this.usersService.saveLoginData(data, this.rememberMe);
        this.router.navigate(['home']);
      },
      error: () => {
        this.noValidForm = true;
        this.isLoading = false;
      },
      complete: () => {
        // código para manejar la finalización de la llamada al servicio
        this.isLoading = false;
      }
    });
  }
}
