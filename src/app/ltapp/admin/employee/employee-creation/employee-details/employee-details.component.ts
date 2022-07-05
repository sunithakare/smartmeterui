import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import { FileUploadResponse } from 'src/app/shared/interface/FileUploadResponse';
import { environment } from 'src/environments/environment';
import { EmployeeRoleDetail } from '../../employee-role/employee-role.component';

import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import { EmployeeDetails, EmployeeDocumentList } from '../employee-creation.component';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  @Input()
  isEditable: boolean = false;
  @Input()
  isNavigation: boolean = false;

  @Input()
  detailResponse: EmployeeDetails;

  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

  spinner = false;
  roleCategoryList: ConfigCode[];
  allStatesList: ConfigCode[];
  employeeForm: FormGroup;
  roleList: EmployeeRoleDetail[];

  qualificationList: EmployeeDocumentList[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'sNo',
    'documentType',
    'documentName',
    'action',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private restClient: HttpclientService
  ) {

    if(this.isEditable){
      this.displayedColumns= [
        'sNo',
        'documentType',
        'documentName',
        'action',
      ];
    }else{
      this.displayedColumns= [
        'sNo',
        'documentType',
        'documentName',
      ];

    }

  }

  ngOnInit(): void {

if(this.isEditable){
  this.displayedColumns= [
    'sNo',
    'documentType',
    'documentName',
    'action',
  ];
}else{
  this.displayedColumns= [
    'sNo',
    'documentType',
    'documentName',
  ];

}

    this.employeeForm = new FormGroup({
      empName: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      empId: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      active: new FormControl(true, [Validators.required]),
      roleCategory: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      doj: new FormControl(new Date(), [Validators.required]),
      dor: new FormControl(new Date()),
      documentList: new FormArray([]),
    });
    this.fetchRolesCategoryList();
    this.fetchAllState();
    this.dataSource.data = (
      this.employeeForm.get('documentList') as FormArray
    ).controls;

    // this.roleName=new FormControl('', [Validators.required, Validators.maxLength(60)]);
    // this.module=new FormControl('', [Validators.required]);
    // this.roleType=new FormControl('', [Validators.required]);
  }
  ngOnChanges() {

    if(this.isEditable){
      this.displayedColumns= [
        'sNo',
        'documentType',
        'documentName',
        'action',
      ];
    }else{
      this.displayedColumns= [
        'sNo',
        'documentType',
        'documentName',
      ];

    }
      this.spinner = true;
      if (
        this.employeeForm == undefined ||
        this.employeeForm == null ||
        !this.isNavigation
      ) {
        this.employeeForm = new FormGroup({
          empName: new FormControl('', [
            Validators.required,
            Validators.maxLength(60),
          ]),
          empId: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
          active: new FormControl(true, [Validators.required]),
          roleCategory: new FormControl('', [Validators.required]),
          role: new FormControl('', [Validators.required]),
          doj: new FormControl(new Date(), [Validators.required]),
          dor: new FormControl(new Date()),
          documentList: new FormArray([]),
        });

        this.dataSource = new MatTableDataSource(
          (this.employeeForm.get('documentList') as FormArray).controls
        );
      }else{

        var docListform=this.detailResponse.documentList.map(this.documnetDataAsFormGroup);

        this.employeeForm = new FormGroup({
          empName: new FormControl( { value: this.detailResponse.empName, disabled: !this.isEditable }, [
            Validators.required,
            Validators.maxLength(60),
          ]),
          empId: new FormControl({ value: this.detailResponse.empId, disabled: this.isNavigation }, [Validators.required]),
          state: new FormControl({ value: this.detailResponse.state, disabled: !this.isEditable }, [Validators.required]),
          active: new FormControl({ value: this.detailResponse.active, disabled: !this.isEditable }, [Validators.required]),
          roleCategory: new FormControl({ value: this.detailResponse.roleCategory, disabled: !this.isEditable }, [Validators.required]),
          role: new FormControl({ value: this.detailResponse.role, disabled: !this.isEditable }, [Validators.required]),
          doj: new FormControl({ value: this.detailResponse.doj, disabled: !this.isEditable }, [Validators.required]),
          dor: new FormControl({ value: this.detailResponse.dor, disabled: !this.isEditable }),
          documentList: this.formBuilder.array(docListform),
        });

        this.dataSource = new MatTableDataSource(
          (this.employeeForm.get('documentList') as FormArray).controls
        );

        this.fetchRolesforCategory(this.detailResponse.roleCategory);
      }

      this.spinner = false;
  }


  fetchAllState(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'STATE';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allStatesList = result.data as ConfigCode[];
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

  fetchRolesCategoryList(): void {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'ROLE_CATEGORY';

    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.roleCategoryList = result.data as ConfigCode[];
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

  fetchRoles(event: MatSelectChange): void {
    this.fetchRolesforCategory(event.value);
  }

  fetchRolesforCategory(value:string): void {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['category'] = value;

    this.restClient
      .getwithParam(
        environment.SLAREPORTS_EMPLOYEE_ROLES_FOR_CATEGORY_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.roleList = result.data as EmployeeRoleDetail[];
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

  addNewQualification(): void {
    var newDoc: EmployeeDocumentList = {
      documentType: '',
      documentName: '',
      documentId: '',
    };

    var fg: FormGroup = this.documnetDataAsFormGroup(newDoc);
    (this.employeeForm.get('documentList') as FormArray).push(fg);
    this.qualificationList.push(newDoc);
    this.dataSource.data = this.dataSource.data;
  }

  removeDocument(index: number): void {
    (<FormArray>this.employeeForm.get('documentList')).removeAt(index);
    this.dataSource.data = this.dataSource.data;
  }

  documnetDataAsFormGroup(element: EmployeeDocumentList): FormGroup {
    var fg = new FormGroup({
      documentType: new FormControl(element.documentType, [Validators.required]),
      documentName: new FormControl(element.documentName, [Validators.required]),
      documnetId: new FormControl(element.documentId, [Validators.required]),
    });
    return fg;
  }
  uploadFile(event: any, element: FormGroup) {
    this.spinner = true;
    var file: File = event.target.files[0];
    var formData = new FormData();
    formData.append('uploadFile', file);
    this.restClient
      .uploadFile(environment.FILE_UPLOAD_API, formData)
      .subscribe({
        next: (result: APIResponse) => {
          var fileData = result.data as FileUploadResponse;

          element.get('documentName')?.setValue(fileData.fileName);
          element.get('documnetId')?.setValue(fileData.fileId);
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

  downloadDocument(docuemntId: string, documentName: string): void {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['docId'] = docuemntId;

    this.restClient
      .downloadusingGet(environment.FILE_DOWNLOAD_API, queryParams)
      .subscribe({
        next: (result: any) => {
          saveAs(result, documentName);
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
  saveEmployeeData(): void {
    console.log(this.employeeForm.getRawValue());
    if (!this.employeeForm.valid) {
      return;
    }

    this.restClient.post(environment.SLAREPORTS_SAVE_EMPLOYEE, this.employeeForm.getRawValue()).subscribe({
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
        console.log('Employee Saved');

        this.spinner = false;
      },
    });
  }
}


