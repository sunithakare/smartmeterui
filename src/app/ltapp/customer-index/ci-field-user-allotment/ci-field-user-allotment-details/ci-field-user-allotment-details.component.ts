import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse, APIResponse, ConfigCode } from 'src/app/services/httpclient.service';
import { environment} from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';

import { FormControl, FormGroup } from '@angular/forms';
import { FieldUserDetail } from '../ci-field-user-allotment.component';


@Component({
  selector: 'app-ci-field-user-allotment-details',
  templateUrl: './ci-field-user-allotment-details.component.html',
  styleUrls: ['./ci-field-user-allotment-details.component.css']
})
export class CiFieldUserAllotmentDetailsComponent implements OnInit {


@Input()
isNavigation: boolean = false;
@Input()
isEditable: boolean = false;
@Input()
fieldUserAllotmentDetails: FieldUserDetail;

@Output() dataSaved: EventEmitter<number> = new EventEmitter();
spinner: boolean = false;
agencyStore:any;
fieldUserStore:any;
fieldUserAllotmentForm: FormGroup ;

constructor(
  private snackBar: MatSnackBar,
  private restClient: HttpclientService
) { }

ngOnInit(): void {
  this.fieldUserAllotmentForm = new FormGroup({
    allocationDatatype: new FormControl(''),
    agency: new FormControl(''),
    mobile: new FormControl(''),
    userId: new FormControl(''),
    divisionId: new FormControl({value:'',disabled:true}),
    fieldUser: new FormControl(''),
    allocationId: new FormControl(''),
  })
  this.fetchAllData();
}
fieldSave:any;
ngOnChanges(){
  if(this.fieldUserAllotmentDetails==null || this.fieldUserAllotmentDetails==undefined){
    this.fieldUserAllotmentForm = new FormGroup({
      fieldUser: new FormControl(''),
      mobile: new FormControl(''),
      userId: new FormControl(''),
      divisionId: new FormControl(''),
      allocationDatatype: new FormControl(''),
      allocationId: new FormControl(''),
      agency:new FormControl(''),
     // divisionId: new FormControl({value:'',disabled:!this.isEditable},[]),
    });
  } else{
    this.fieldSave=this.fieldUserAllotmentDetails.fieldUser;

    this.fieldUserAllotmentForm = new FormGroup({
      fieldUser: new FormControl(this.fieldUserAllotmentDetails.fieldUser),
      mobile: new FormControl(this.fieldUserAllotmentDetails.mobile),
      userId: new FormControl(this.fieldUserAllotmentDetails.userId),
      divisionId: new FormControl(this.fieldUserAllotmentDetails.divisionId),
      allocationDatatype: new FormControl(this.fieldUserAllotmentDetails.allocationDatatype),
      allocationId: new FormControl(this.fieldUserAllotmentDetails.allocationId),
      agency:new FormControl(this.fieldUserAllotmentDetails.agency),
      //allocationDataType: new FormControl(this.fieldUserAllotmentDetails.allocationDataType),
    });
  }
}

//  response:MobileNOLookupAPIResp;

 allocationDataType = new FormControl();
// allocationDataTypeList: string[] = ['CI', 'MI', 'O&M', 'ENH'];

fetchAllData(): void{
  this.spinner = true;
  var queryParams: any ={};
  queryParams['mobile'] = this.fieldUserAllotmentForm.getRawValue().mobile;
  queryParams['userId'] = this.fieldUserAllotmentForm.getRawValue().userId;

  this.restClient.getwithParam(environment.FETCH_ALL_DATA_FOR_POPULATE,queryParams)
  .subscribe({
    next: (result: APIResponse) => {
      var response = result.data as MobileAndDivisionLookupAPIResp;
     // console.log(response.agencyName);
      this.fieldUserAllotmentForm.controls['agency'].setValue(response.agencyName);
      this.fieldUserAllotmentForm.controls['fieldUser'].setValue(response.fieldUserName);
      this.fieldUserAllotmentForm.controls['divisionId'].setValue(response.divisionCode);
      if (queryParams['mobile']!==null) {
        this.fieldUserAllotmentForm.controls['userId'].setValue(response.userId);
      }
      if(queryParams['userId']!==null) {
        this.fieldUserAllotmentForm.controls['mobile'].setValue(response.mobile);
      }

    },
    error: (err: any) => {
      console.log(err);
      this.spinner = false;
    },
    complete: () => {
      this.spinner = false;
    },
  });
}
// divisionStore:any;
// fetchDivisions(): void{
//   this.spinner=true;
//   var queryParams: any={};
//   queryParams['agency'] = this.fieldUserAllotmentForm.getRawValue().agency;

//   this.restClient.getwithParam(environment.FETCH_DATA_TO_GET_DIVISIONS,queryParams)
//   .subscribe({
//     next:(result: APIResponse) => {
//       var resp = result.data as DivisionLookupAPIResp;
//       this.divisionStore=resp.divisionCode;
//       this.fieldUserAllotmentForm.controls['divisionCode'].setValue(resp.divisionCode)
//     },
//     error: (err: any) => {
//       console.log(err);
//       this.spinner = false;
//     },
//     complete: () => {
//       this.spinner = false;
//     },
//   });
// }


saveFieldUserAllotment(){
if(!this.fieldUserAllotmentForm.valid){
  return;
}
this.spinner = true;
var queryParams: any = {};
let apiURL='';
if(this.isNavigation){
  apiURL=environment.UPDATE_FIELD_USER_ALLOTMENT_API+'/'+this.fieldSave;

}else{
  apiURL=environment.SAVE_FIELD_USER_ALLOTMENT_API;
}
//check request body is require or not
this.restClient.post(apiURL, this.fieldUserAllotmentForm.getRawValue()).subscribe({
  next: (result: APIResponse) => {
    let snackBarRef = this.snackBar.open(
      'Data Saved Successfully','close',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
      }
    );
    this.dataSaved.emit(0);
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
    console.log('Field User Allotment Saved');
    this.spinner = false;
  },
});
}




}

export interface DivisionLookupAPIResp{
 divisionCode?:String;
}

export interface MobileNOLookupAPIResp{
agencyName?: string;
fieldUserName?: string;
}

// export interface MobileAndDivisionLookupAPIResp{
//   agencyName?: string;
//   fieldUserName?: string;
//   divisionCode?:String;
// }

export interface MobileAndDivisionLookupAPIResp {
agencyName: string
fieldUserName: string
divisionCode: string
mobile: string
userId: string
}



