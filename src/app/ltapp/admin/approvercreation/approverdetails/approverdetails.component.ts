import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import {
  environment,
  roleConfig,
  roleType,
} from 'src/environments/environment';
import { ApproverDetail } from '../approver-creation.component';

@Component({
  selector: 'app-approver-details',
  templateUrl: './approver-details.component.html',
  styleUrls: ['./approver-details.component.css'],
})
export class ApproverDetailsComponent implements OnInit {
  @Input()
  isEditable: boolean = false;
  @Input()
  isNavigation: boolean = false;
  @Input()
  userName: string;

  @Input()
  approverTypeList: ConfigCode[];
  allCity: ConfigCode[];
  allDiscom: ConfigCode[];

  userNameEditable: boolean = true;
  @Output() dataSaved: EventEmitter<number> = new EventEmitter();

  approverForm: FormGroup;

  approverFilterList: ApproverTableIterator[] = [];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'sNo',
    'approverType',
    'approverFor',
    'approverFilter',
    'action',
  ];

  spinner = false;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras.state != null) {
      const state = navigation.extras.state as {
        userName: string;
      };
      this.userName = state.userName;
      this.isNavigation = false;
      this.userNameEditable = true;
    }
  }

  ngOnInit(): void {
    this.isEditable =
      this.authservice.checkPermission(
        roleType.ADMIN,
        roleConfig.ApproverCreation
      ) ||
      this.authservice.checkPermission(
        roleType.MANAGER,
        roleConfig.ApproverCreation
      );

    this.approverFilterList = [];
    // this.approverForm = new FormGroup({
    //   userName: new FormControl('', [
    //     Validators.required,
    //     Validators.maxLength(150),
    //   ]),
    //   approverDataList: this.formBuilder.array([]),
    // });

    // let arrayResposne: ApproverDetail[] = [];
    // let approverFGArray = arrayResposne.map(this.ApproverDataAsFormGroup, {
    //   isEditable: this.isEditable,
    // });

    // this.approverForm.setControl(
    //   'approverDataList',
    //   new FormArray(approverFGArray)
    // );

    // this.dataSource = new MatTableDataSource(
    //   (this.approverForm.get('approverDataList') as FormArray).controls
    // );
    this.fetchAllCity();
    this.fetchAllDiscom();
    this.fetchApproverTypeList();

    if (
      this.userName == undefined ||
      this.userName == null ||
      this.userName == ''
    ) {
      this.approverForm = new FormGroup({
        userName: new FormControl(
          { value: '', disabled: !this.isEditable || this.isNavigation },
          [Validators.required, Validators.maxLength(150)]
        ),
        approverDataList: this.formBuilder.array([]),
      });

      let arrayResposne: ApproverDetail[] = [];
      let approverFGArray = arrayResposne.map(this.ApproverDataAsFormGroup, {
        isEditable: this.isEditable,
      });

      this.approverForm.setControl(
        'approverDataList',
        new FormArray(approverFGArray)
      );

      this.dataSource = new MatTableDataSource(
        (this.approverForm.get('approverDataList') as FormArray).controls
      );
    } else {
      this.approverForm = new FormGroup({
        userName: new FormControl(
          {
            value: this.userName,
            disabled: !this.isEditable || this.isNavigation,
          },
          [Validators.required, Validators.maxLength(150)]
        ),
        approverDataList: this.formBuilder.array([]),
      });

      let arrayResposne: ApproverDetail[] = [];
      let approverFGArray = arrayResposne.map(this.ApproverDataAsFormGroup, {
        isEditable: this.isEditable,
      });

      this.approverForm.setControl(
        'approverDataList',
        new FormArray(approverFGArray)
      );

      this.dataSource = new MatTableDataSource(
        (this.approverForm.get('approverDataList') as FormArray).controls
      );

      this.getApproverData(this.userName);
    }

    // this.approverForm.controls['userName'].valueChanges.subscribe(value => {
    //   this.getApproverData(value);
    // });
  }
  ngOnChanges() {
    if (
      this.userName == undefined ||
      this.userName == null ||
      this.userName == ''
    ) {
      this.approverForm = new FormGroup({
        userName: new FormControl(
          { value: '', disabled: !this.isEditable || this.isNavigation },
          [Validators.required, Validators.maxLength(150)]
        ),
        approverDataList: this.formBuilder.array([]),
      });

      let arrayResposne: ApproverDetail[] = [];
      let approverFGArray = arrayResposne.map(this.ApproverDataAsFormGroup, {
        isEditable: this.isEditable,
      });

      this.approverForm.setControl(
        'approverDataList',
        new FormArray(approverFGArray)
      );

      this.dataSource = new MatTableDataSource(
        (this.approverForm.get('approverDataList') as FormArray).controls
      );
    } else {
      this.approverForm = new FormGroup({
        userName: new FormControl(
          {
            value: this.userName,
            disabled: !this.isEditable || this.isNavigation,
          },
          [Validators.required, Validators.maxLength(150)]
        ),
        approverDataList: this.formBuilder.array([]),
      });

      let arrayResposne: ApproverDetail[] = [];
      let approverFGArray = arrayResposne.map(this.ApproverDataAsFormGroup, {
        isEditable: this.isEditable,
      });

      this.approverForm.setControl(
        'approverDataList',
        new FormArray(approverFGArray)
      );

      this.dataSource = new MatTableDataSource(
        (this.approverForm.get('approverDataList') as FormArray).controls
      );

      this.getApproverData(this.userName);
    }

    // this.approverForm.controls['userName'].valueChanges.subscribe(value => {
    //   this.getApproverData(value);
    // });
  }
  getApproverData(userName: string): void {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['userName'] = userName;

    this.restClient
      .getwithParam(environment.FIND_APPROVER_BY_NAME_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          let arrayResposne = result.data as ApproverDetail[];
          if (arrayResposne.length > 0) {
            this.isNavigation = true;
          }
          let approverFGArray = arrayResposne.map(
            this.ApproverDataAsFormGroup,
            {
              isEditable: this.isEditable,
            }
          );

          this.approverForm.setControl(
            'approverDataList',
            new FormArray(approverFGArray)
          );

          arrayResposne.forEach((x) => {
            this.approverFilterList.push({
              city: this.allCity,
              discom: this.allDiscom,
            });
          });

          this.dataSource = new MatTableDataSource(
            (this.approverForm.get('approverDataList') as FormArray).controls
          );
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.approverForm.controls['userName'].setErrors({ incorrect: true });
          this.spinner = false;
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          this.spinner = false;
        },
      });
  }

  saveApproverData() {
    if (!this.approverForm.valid) {
      return;
    }
    var detaislList: ApproverDetail[] =
      this.approverForm.getRawValue().approverDataList;
    detaislList = detaislList.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.approverIdentity === value.approverIdentity &&
            t.approverFilter === value.approverFilter &&
            t.approvalFor === value.approvalFor
        )
    );

    this.spinner = true;

    var queryParams: any = {};
    let apiURL = '';
    if (this.isNavigation) {
      apiURL = environment.SAVE_APPROVER_API;
    } else {
      apiURL = environment.CREATE_APPROVER_API;
    }

    this.restClient.post(apiURL, this.approverForm.getRawValue()).subscribe({
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
        var message = 'Server Error';
        if (err instanceof HttpErrorResponse) {
          if (err.status == 404) {
            message = ' User Name Not Valid';
          }
        }

        let snackBarRef = this.snackBar.open(message, 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.spinner = false;
      },
      complete: () => {
        console.log('Approver Saved');

        this.spinner = false;
      },
    });
  }

  deleteApprover() {
    var user: string = this.approverForm.getRawValue().userName;
    let apiURL = environment.DELETE_APPROVER_API + '/' + user;

    this.restClient.delete(apiURL).subscribe({
      next: (result: APIResponse) => {
        let snackBarRef = this.snackBar.open(
          'Approver:' + user + ' Deleted SuccessFully',
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
        console.log('Approver Deleted');
        this.spinner = false;
      },
    });
  }

  fetchAllCity() {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'CITY';

    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allCity = result.data as ConfigCode[];
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

  fetchAllDiscom() {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';

    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiscom = result.data as ConfigCode[];
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

  fetchApproverTypeList() {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'APPROVERTYPE';

    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.approverTypeList = result.data as ConfigCode[];
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
  ApproverDataAsFormGroup(approverData: ApproverDetail): FormGroup {
    // const fg = new FormGroup({
    //   approverIdentity: new FormControl(
    //     { value: approverData.approverIdentity, disabled: !this.isEditable },
    //     Validators.required
    //   ),
    //   approverFilter: new FormControl(
    //     { value: approverData.approverFilter, disabled: !this.isEditable }
    //   ),
    //   approvalFor: new FormControl(
    //     { value: approverData.approvalFor, disabled: !this.isEditable }
    //   ),
    // });

    const fg = new FormGroup({
      approverIdentity: new FormControl(
        { value: approverData.approverIdentity, disabled: !this.isEditable },
        Validators.required
      ),
      approverFilter: new FormControl(
        { value: approverData.approverFilter, disabled: !this.isEditable  }
      ),
      approvalFor: new FormControl(
        { value: approverData.approvalFor, disabled: !this.isEditable }
      ),
    });
    return fg;
  }
  removeApproverData(index: number): void {
    (<FormArray>this.approverForm.get('approverDataList')).removeAt(index);
    this.approverFilterList.splice(index, 1);
    this.dataSource.data = this.dataSource.data;
  }
  addNewApproverData(): void {
    if (this.approverForm.value.approverDataList.length > 0) {
      var lastItem =
        this.approverForm.value.approverDataList[
          this.approverForm.value.approverDataList.length - 1
        ];
      if (lastItem.approverIdentifier == '' || lastItem.approverType == '') {
        let snackBarRef = this.snackBar.open(
          'Please Verify Existing Record',
          'close',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          }
        );
        return;
      }
    }

    (<FormArray>this.approverForm.get('approverDataList')).push(
      this.ApproverDataAsFormGroup(new ApproverDetail())
    );
    this.dataSource.data = this.dataSource.data;

    this.approverFilterList.push({
      city: this.allCity,
      discom: this.allDiscom,
    });
  }
  checkDisableSelection(event: MatSelectChange, index: number) {
    if(event.value=="SPOC" || event.value=="PROJECT_DIRECTOR"|| event.value=="CLIENT_DIRECTOR" ||event.value=="UPPCL_MANAGER" || event.value=="UPPCL_CLIENT_MANAGER"){
      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approvalFor'].disable();
      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approverFilter'].disable();
      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approvalFor'].setValue('');
      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approverFilter'].setValue('');
    }else{

      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approvalFor'].enable();
      (<FormGroup>(<FormArray>this.approverForm.get('approverDataList')).at(index)).controls['approverFilter'].enable();
    }
  }
  changeApproverFilter(event: MatSelectChange, index: number) {
    if (event.value == 'City') {
      if (index < this.approverFilterList.length) {
        this.approverFilterList[index].city = this.allCity;
      } else {
        this.approverFilterList.push({
          city: this.allCity,
          discom: this.allDiscom,
        });
      }
    } else if (event.value == 'Discom') {
      this.approverFilterList[index].discom = this.allDiscom;
    } else {
      this.approverFilterList.push({
        city: this.allCity,
        discom: this.allDiscom,
      });
    }
  }
}

export interface ApproverTableIterator {
  city: ConfigCode[];
  discom: ConfigCode[];
}
