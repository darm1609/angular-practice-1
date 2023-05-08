import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router : Router,
    private cookieService : CookieService
  ) {}

  onLoggedOff() {
    debugger;
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
