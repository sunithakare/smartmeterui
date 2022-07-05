import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  isLoggedin = false;
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public deleteToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
public getUserName():string{
  const authToken = localStorage.getItem(TOKEN_KEY);
  if (authToken &&!jwtHelper.isTokenExpired(authToken)) {
    let user:string=jwtHelper.decodeToken(authToken).USER

    return user;
  }
  return '';
}


  public getUserRoles(): any {
    const userRole = localStorage.getItem(USER_KEY);
    if (userRole &&!jwtHelper.isTokenExpired(userRole)) {
      let roles:string[]=jwtHelper.decodeToken(userRole).AUTHORITIES_KEY.split(',');

      return roles;
    }
    return [];
  }

  public getIsUserLogedIn(): boolean {
    if (localStorage.getItem(TOKEN_KEY) == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      this.isLoggedin = true;
      const token:string = localStorage.getItem(TOKEN_KEY)|| '{}' ;
      return !jwtHelper.isTokenExpired(token);
    }
  }
}
