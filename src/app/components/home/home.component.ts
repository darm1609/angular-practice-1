import { IUser } from './../../models/userLogin.model';
import { UsersService } from './../../services/login/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userLoggedName : string | undefined = undefined;

  constructor(
    private router : Router,
    private cookieService : CookieService,
    private usersService : UsersService
  ) {}

  ngOnInit() {
    this.usersService.userLogged$.subscribe((user : IUser | null) => {
      this.userLoggedName = user?.fullUserName;
    });
  }

  onLoggedOff() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
