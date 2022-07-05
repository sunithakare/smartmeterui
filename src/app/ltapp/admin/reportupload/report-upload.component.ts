import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { StateDiscomData } from 'src/app/shared/interface/StateDiscomData';
import { UserDiscomData } from 'src/app/shared/interface/UserDiscomData';
import { environment } from 'src/environments/environment';
import { StateData } from '../../../shared/interface/StateData';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.css']
})
export class ReportUploadComponent implements OnInit {
  spinner:boolean=false;
  uploadForm:FormGroup;
  currentYear: number=new Date().getFullYear();
  yearSelectorList:number[]=[];

  file: File;


stateList:StateData[]=[];
discomList:UserDiscomData[]=[];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {

    for (let index = -2; index < 10; index++) {
      this.yearSelectorList.push(this.currentYear+index);

    }

    this.uploadForm = new FormGroup({
      quarter: new FormControl('', [
        Validators.required
      ]),
      year: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      report: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      discom: new FormControl('', [Validators.required]),
      file: new FormControl(),
    });


    this.restClient
    .getResponse(environment.USER_DISCOM_DATA_API)
    .subscribe({
      next: (result: APIResponse) => {
        var content: StateDiscomData[] = result.data as StateDiscomData[];
        content.forEach(resp=>{
          if (resp.isdefault) {
            this.uploadForm.patchValue({
              discom:resp.discomName,
              state:resp.state
            });
          }
          if (!this.discomList.some(discom=>{return discom.discomName==resp.discomName})) {
            this.discomList.push({discomName:resp.discomName,isdefault:resp.isdefault});
          }
          if (!this.stateList.some(discom=>{return discom.state==resp.state})) {
            this.stateList.push({state:resp.state,isdefault:resp.isdefault});
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });



  }
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      // this.currentFile = file;
      // this.fileName = this.currentFile.name;

      // this.uploadForm.controls['file'].setValue(this.file);
      // this.uploadForm.controls['file'].updateValueAndValidity();

    } else {
      // this.fileName = 'Select File';
    }
  }



  uploadReport():void{
var formData=new FormData();
formData.append("formdata",new Blob([JSON.stringify(this.uploadForm.getRawValue())], {
  type: 'application/json',
}));
formData.append("uploadFile",this.file);
    this.restClient.uploadFile('/sladashboard/uploadrfp', formData).subscribe({
      next: (result: APIResponse) => {
        let snackBarRef = this.snackBar.open(
          'Data Saved SuccessFully',
          'close',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          }
        );
      },
      error: (err: any) => {
        console.log(err);

        let snackBarRef = this.snackBar.open('Server Error', 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.spinner = false;
      },
      complete: () => {
        console.log('Role Saved');

        this.spinner = false;
      },
    });
  }
}
