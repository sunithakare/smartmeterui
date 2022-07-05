import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class GenericAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    // route.params['module']

    // console.log("module:", route.params['module']);

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

      if (this.auth.checkPermission(route.data['role'],route.data['permission'])) {
          return true;
      }

    this.router.navigate(['login']);
    return false;
  }
}
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SLAAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    // route.params['module']

    // console.log("module:", route.params['module']);

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    var module=route.params['module'];
    if(module!=undefined){
      if (this.auth.checkPermission("ANY",module)) {

          return true;
      }
    }else{
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
