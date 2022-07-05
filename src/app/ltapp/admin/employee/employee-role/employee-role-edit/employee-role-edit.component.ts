import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APIResponse, ConfigCode, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { EmployeeRoleDetail } from '../employee-role.component';

@Component({
  selector: 'app-employee-role-edit',
  templateUrl: './employee-role-edit.component.html',
  styleUrls: ['./employee-role-edit.component.css']
})
export class EmployeeRoleEditComponent implements OnInit {

  spinner:boolean=false;
  roleTypeList:ConfigCode[];
  constructor(
    public dialogRef: MatDialogRef<EmployeeRoleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private router: Router,
  ) {

    this.fetchRoleCategoryList();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  fetchRoleCategoryList():void{
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'ROLE_CATEGORY';

    this.restClient
      .getwithParam(
        environment.FETCH_CONFIG_CODE_LIST_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.roleTypeList = result.data as ConfigCode[];
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          console.log('Role Category Fetch Complete ');
          this.spinner = false;
        },
      });
  }


  save() {
    // var requestBody = {
    //   // masterData:this.data.masterData,
    //   // remarks:this.data.remarks,
    //   // approveReject: this.data.approveReject,
    // }
    this.spinner = true;
    // console.log(JSON.stringify(requestBody));
    this.restClient
      .post(environment.SLAREPORTS_SAVE_EMPLOYEE_ROLES_API, this.data)
      .subscribe({
        next: (result: APIResponse) => {

          let snackBarRef = this.snackBar.open(
            'Role Saved SuccessFully',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
          this.dialogRef.close("RELOAD");
          // window.location.reload();
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Some Error Occoured! Try Again', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.spinner = false;
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }
  deleteRole() {
    // var requestBody = {
    //   // masterData:this.data.masterData,
    //   // remarks:this.data.remarks,
    //   // approveReject: this.data.approveReject,
    // }
    this.spinner = true;
    // console.log(JSON.stringify(requestBody));
    this.restClient
      .deleteWithBody(environment.SLAREPORTS_DELETE_EMPLOYEE_ROLES_API, this.data)
      .subscribe({
        next: (result: APIResponse) => {

          let snackBarRef = this.snackBar.open(
            'Role Deleted SuccessFully',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
          this.dialogRef.close("RELOAD");
          // window.location.reload();
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Some Error Occoured! Try Again', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.spinner = false;
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }
}

