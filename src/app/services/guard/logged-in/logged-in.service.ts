import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUserJwtToken, IUser } from '../../../models/userLogin.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanActivate {

  constructor(
    private router : Router,
    private cookieService : CookieService) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const userCookie : string = this.cookieService.get('user');
    const tokenCookie : string = this.cookieService.get('token');

    if (!userCookie || !tokenCookie) {
      this.router.navigate(['/login']);
      return false
    }

    const userCookieJson : IUser = JSON.parse(userCookie);

    const currentToken : IUserJwtToken = jwtDecode(tokenCookie);

    if (!currentToken) {
      this.router.navigate(['/login']);
      return false
    }

    if (userCookieJson._id != currentToken.user._id) {
      this.router.navigate(['/login']);
      return false
    }

    return true;
  }
}
