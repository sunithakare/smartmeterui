import { Component } from '@angular/core';
import {Router} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();

    // if (this.isLoggedIn) {
    //   const user = this.tokenStorageService.getUser();
    //   this.roles = user.roles;

    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    //   this.username = user.username;
    // }
  }

  logout(): void {
    window.location.reload();
  }

  loginbuttonClick():void {
    this.isLoggedIn=true;
      // this.route.navigate(['/login']); // navigate to other page
  }
}
