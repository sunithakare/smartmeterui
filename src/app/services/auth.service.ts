import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';


// const AUTH_API = '//localhost:8080/authenticate';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private tokenStorageService:TokenStorageService) { }

  userRoles:string[]=[];

  login(username: string, password: string) {
    // return this.http.post(AUTH_API , {
    //   username,
    //   password
    // }, httpOptions);
    return this.http.post<any>(environment.BASE_URL+environment.AUTH_API, {
      username,
      password
    }
)
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(environment.BASE_URL+environment.AUTH_API + 'signup', {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }
  public isAuthenticated(): boolean {
    return this.tokenStorageService.getIsUserLogedIn();
  }

  public checkPermission(roleType:string,permission:string): boolean {
    let role=roleType+"_"+permission;
    if ((roleType=='ANY' && permission=='ANY')) {
      return true;
    }
    var rolesList:string[]=this.tokenStorageService.getUserRoles();
    return rolesList.some(x=>{
      if (roleType=='ANY') {

        return (roleType=='ANY' && (x.indexOf("_"+permission)>=0))
      }else{

        return x==role
      }
    });
  }
  public  logout(router:Router):void{
    // call api to logout user

    this.http.get<any>(environment.BASE_URL+environment.LOGOUT_API).subscribe(
      {
        next: (result: any) => {

        },
        error: (err: any) => {
        },
        complete: () => {
          console.log('Logout Complete ');

          this.tokenStorageService.deleteToken();
          router.navigate(['/home'])
          .then(value => {
            // window.location.reload();
        })
        },
      }
    );

  }

  public  getUserName():string{
    // call api to logout user
    return this.tokenStorageService.getUserName();

  }

}
