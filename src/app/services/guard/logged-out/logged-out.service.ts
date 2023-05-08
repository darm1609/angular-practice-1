import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUserJwtToken, IUser } from '../../../models/userLogin.model';
import { UsersService } from '../../../services/login/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutService implements CanActivate {

  constructor(
    private router : Router,
    private cookieService : CookieService,
    private usersService : UsersService
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userCookie : string = this.cookieService.get('user');
    const tokenCookie : string = this.cookieService.get('token');

    if (!userCookie || !tokenCookie) {
      this.usersService.onLoginOff();
      return true;
    }

    const userCookieJson : IUser = JSON.parse(userCookie);

    const currentToken : IUserJwtToken = jwtDecode(tokenCookie);

    if (!currentToken) {
      this.usersService.onLoginOff();
      return true;
    }

    if (userCookieJson._id != currentToken.user._id) {
      this.usersService.onLoginOff();
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
