import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './_services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tmv-admin-page';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) { }
  displayMenu: any;
  logout() {
    this.authService.logout();
    localStorage.removeItem('currentUser');
    this.displayMenu = localStorage.getItem('currentUser');
    console.log("current out", this.displayMenu);
  }
  ngOnInit() {
    this.displayMenu = localStorage.getItem('currentUser');
    console.log("current ", this.displayMenu);
    console.log("login flag", this.authService.isLoggedIn);

    this.isLoggedIn$ = this.authService.isLoggedIn;

  }
}
