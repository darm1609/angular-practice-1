import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../models/userLogin.model';
import { ILogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL_API = `${environment.HOST}`;

  constructor(
    private cookieService : CookieService,
    private http: HttpClient
  ){ }


  onLogin(user: ILogin) : any {
    return this.http.post<IUserLogin>(`${this.URL_API}/user/login_user`, user)
  }

  saveLoginData(userLogin: IUserLogin) : void {
    this.cookieService.set('token', JSON.stringify(userLogin.token));
    this.cookieService.set('user', JSON.stringify(userLogin.user));
  }

}
