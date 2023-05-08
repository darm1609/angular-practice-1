import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../../models/userLogin.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanActivate {

  constructor(
    private router : Router,
    private cookieService : CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let userCookie : string = this.cookieService.get('user');
    let tokenCookie : string = this.cookieService.get('token');

    if (!userCookie || !tokenCookie) {
      this.router.navigate(['/login']);
      return false
    }

    let userCookieJson : IUser = JSON.parse(userCookie);

    let currentToken : any = jwtDecode(tokenCookie);

    if (!currentToken) {
      this.router.navigate(['/login']);
      return false
    }

    if (userCookieJson._id != currentToken.user._id) {
      this.router.navigate(['/login']);
      return false
    };

    return true;
  }
}
