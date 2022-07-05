import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { FileUploadResponse } from 'src/app/shared/interface/FileUploadResponse';
import { environment } from 'src/environments/environment';
import { UserCreationDetailsResponse } from '../ci-field-user-list.component';


@Component({
  selector: 'app-ci-field-user-details',
  templateUrl: './ci-field-user-details.component.html',
  styleUrls: ['./ci-field-user-details.component.css']
})




export class CiFieldUserDetailsComponent implements OnInit {
  fieldUserCreationForm: FormGroup;

  spinner:boolean=false;
  @Input()
  isNavigation:boolean=false;
  @Input()
  isEditable:boolean=false;
  @Input()
  fielduserdetail:UserCreationDetailsResponse;
  file: File;

  employeeForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
 // uploadForm:FormGroup;

  @Output()
  FielddataSaved:EventEmitter<number>=new EventEmitter();

  constructor(
    private snackBar: MatSnackBar,
    private restClient:HttpclientService
  ) {}

  ngOnInit(): void {
   this.fieldUserCreationForm= new FormGroup({
    agencyName:new FormControl(''),
    mobile:new FormControl(''),
    userId:new FormControl(''),
    status:new FormControl(''),
    email:new FormControl(''),
    userFirstName:new FormControl(''),
    userLastName:new FormControl(''),
    password:new FormControl(''),
    idProof: new FormControl(''),
  })
  }
  userCodeSave:any;
ngOnChanges(){
  if(this.fielduserdetail==undefined && this.fielduserdetail==null){
  this.fieldUserCreationForm= new FormGroup({
agencyName:new FormControl(''),
mobile:new FormControl(''),
userId:new FormControl(''),
status:new FormControl(''),
email:new FormControl(''),
userFirstName:new FormControl(''),
userLastName:new FormControl(''),
//password:new FormControl(''),
idProof :new FormControl(''),
  });
  } else{
    this.userCodeSave = this.fielduserdetail.fieldUserCode;
  this.fieldUserCreationForm=new FormGroup({
    agencyName:new FormControl({value:this.fielduserdetail.agencyName,disabled:!this.isEditable  || this.isNavigation},[]),
    mobile:new FormControl(this.fielduserdetail.mobile),
    userId:new FormControl(this.fielduserdetail.userId),
    status:new FormControl(this.fielduserdetail.status),
    email:new FormControl(this.fielduserdetail.email),
    userFirstName:new FormControl(this.fielduserdetail.userFirstName),
    userLastName:new FormControl(this.fielduserdetail.userLastName),
    idProof: new FormControl(this.fielduserdetail.idProof),
  });
}
}





  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
  
    } else {
      
    }
  }

  removeDocument(index: number): void {
    (<FormArray>this.employeeForm.get('documentList')).removeAt(index);
    this.dataSource.data = this.dataSource.data;
  }

 
  uploadFile(event: any) {
    this.spinner = true;
    var file: File = event.target.files[0];
    var formData = new FormData();
    formData.append('uploadFile', file);
    this.restClient
      .uploadFile(environment.FILE_UPLOAD_API, formData)
      .subscribe({
        next: (result: APIResponse) => {
          var fileData = result.data as FileUploadResponse;

          // element.get('documentName')?.setValue(fileData.fileName);
          // element.get('documnetId')?.setValue(fileData.fileId);
          // let snackBarRef = this.snackBar.open(
          //   'File Upload SuccessFully',
          //   'close',
          //   {
          //     horizontalPosition: 'center',
          //     verticalPosition: 'bottom',
          //     duration: 3000,
          //   }
          // );
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


  savefieldusercreation(){
  if (!this.fieldUserCreationForm.valid){
    return;
  }
  this.spinner=true;
  let requestBody:fieldRequest={
    agencyName:this.fieldUserCreationForm.getRawValue().agencyName,
    mobile:this.fieldUserCreationForm.getRawValue().mobile,
    userId:this.fieldUserCreationForm.getRawValue().userId,
    status:this.fieldUserCreationForm.getRawValue().status,
    email:this.fieldUserCreationForm.getRawValue().email,
    userFirstName:this.fieldUserCreationForm.getRawValue().userFirstName,
    userLastName:this.fieldUserCreationForm.getRawValue().userLastName,
    password:this.fieldUserCreationForm.getRawValue().password,
  };
  var queryParams: any={};
  let apiURL='';
  if(this.isNavigation){
    apiURL=environment.UPDATE_CI_FIELD_USER_CREATION+"/"+this.userCodeSave;

  }else{
    apiURL=environment.SAVE_FIELD_USER_DATA;
  }
  this.restClient.post(apiURL , requestBody).subscribe({
    next: (result: APIResponse) =>{
      let snackBarRef = this.snackBar.open(
        'Data Saved','close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        }
      );
      this.FielddataSaved.emit(0);
    },

  


    error:(err: any) =>{
      console.log(err);

      let snackBarRef = this.snackBar.open('Server Error', 'close', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
      });
      this.spinner = false;
    },
    complete: () =>{
      console.log('field saved');
      this.spinner= false;
    },
    
  });

  }
  

}
export interface fieldRequest{
  agencyName:string;
  userId: string;
  status?: string;
  email: string;
  userFirstName:string;
  userLastName:string;
  password:string;
  mobile:string;
}


