import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { IUserLogin, IUser } from '../../models/userLogin.model';
import { ILogin } from '../../models/login.model';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userLogged = new BehaviorSubject<IUser | null>(null);
  public userLogged$ = this.userLogged.asObservable();

  private URL_API = `${environment.HOST}`;

  constructor(
    private router : Router,
    private cookieService : CookieService,
    private http: HttpClient
  ){ }

  onLogin(user: ILogin) : Observable<IUserLogin> {
    return this.http.post<IUserLogin>(`${this.URL_API}/user/login_user`, user)
  }

  onLoginOff() {
    this.cookieService.deleteAll();
  }

  onAddUserObservable(user : IUser){
    this.userLogged.next(user);
  }

  saveLoginData(userLogin: IUserLogin, rememberMe: boolean) : void {

    if (rememberMe) {
      this.cookieService.set('token', JSON.stringify(userLogin.token), {
        expires: new Date('2100-01-01')
      });
      this.cookieService.set('user', JSON.stringify(userLogin.user), {
        expires: new Date('2100-01-01')
      });
    }
    else {
      this.cookieService.set('token', JSON.stringify(userLogin.token));
      this.cookieService.set('user', JSON.stringify(userLogin.user));
    }

    this.onAddUserObservable(userLogin.user);

  }
}
