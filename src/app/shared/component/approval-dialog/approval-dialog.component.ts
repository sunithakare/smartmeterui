import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { ApprovalDialogData } from '../../interface/ApprovalDialogData';

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.css']
})
export class ApprovalDialogComponent implements OnInit {

spinner:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApprovalDialogData,
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private router: Router,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  onsubmit() {
    var requestBody = {
      masterData:this.data.masterData,
      remarks:this.data.remarks,
      approveReject: this.data.approveReject,
    }
    this.spinner = true;
    // console.log(JSON.stringify(requestBody));
    this.restClient
      .post(this.data.submitURL, requestBody)
      .subscribe({
        next: (result: APIResponse) => {

          let snackBarRef = this.snackBar.open(
            'Request Approved SuccessFully',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
          this.dialogRef.close();
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
