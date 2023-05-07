import { UsersService } from '../../services/login/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ILogin } from '../../models/login.model';
import { IUserLogin } from '../../models/userLogin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'angular-practice-1';
  isPasswordShown: boolean = false;
  isLoading: boolean = false;
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
    private router: Router
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

    this.isLoading = true;
    this.usersService.onLogin(this.logueo).subscribe({
      next: (data: IUserLogin) => {
        console.log(data);
        if (!data.success) {
          this.noValidForm = true;
          return
        }
        this.usersService.saveLoginData(data);
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
