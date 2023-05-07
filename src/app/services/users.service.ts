import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL_API = `${environment.HOST}/api`

  constructor(
    private cookieService : CookieService
  )
  { }



}
