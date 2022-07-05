import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  message:string='';

  constructor(public dialogRef: MatDialogRef<LoginComponent>,private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    console.log(new Date() + ": " + username);
    this.authService.login(username, password)
    .subscribe( {
      next: (result: any) => {
        console.log(result);

        if(result.jwttoken!=null){
          this.tokenStorage.saveToken(result.jwttoken);
          this.tokenStorage.saveUser(result.roles);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // this.roles = this.tokenStorage.getUser().roles;
          // this.authService.getUserRoles();

        }

        this.dialogRef.close();
      },
      error: (err: any) => {
        this.message="Invalid Credentials";
        console.log(err);
      },
      complete:() => {
        console.log("On complete");
        this.tokenStorage.getIsUserLogedIn();
        // alert( this.tokenStorage.getIsUserLogedIn());
        this.reloadPage();

    // window.location.reload();
      }

  });
  // this.router.navigate(['/ltapp']).then(nav => {
  //   console.log(nav); // true if navigation is successful
  // }, err => {
  //   console.log(err) // when there's an error
  // });
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['/ltapp'])
                .then(value => {
                  // window.location.reload();
                }
    )
  }
  logout():void{
    // call api to logout user
    this.tokenStorage.deleteToken();
    // this.router.navigate(['/home'])
    //       .then(value => {
    //         window.location.reload();
    //     })
  }
}
