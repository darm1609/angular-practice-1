import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutService {

  constructor(
    private router : Router,
    private cookieService : CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let userCookie : string = this.cookieService.get('user');
    let tokenCookie : string = this.cookieService.get('token');

    if (!userCookie || !tokenCookie) {
      this.cookieService.deleteAll();
      return true;
    }

    let userCookieJson : IUser = JSON.parse(userCookie);

    let currentToken : any = jwtDecode(tokenCookie);

    if (!currentToken) {
      this.cookieService.deleteAll();
      return true;
    }

    if (userCookieJson._id != currentToken.user._id) {
      this.cookieService.deleteAll();
      return true;
    };

    this.router.navigate(['/home']);
    return true;
  }
}
