import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  spinner: boolean = false;

  userdetails: FormGroup;
  employmentDetails: FormGroup;
  locationDetails: FormGroup;
  applicationDetails: FormGroup;
  VPNDetails: FormGroup;
  applicationAccess: FormArray;
  objectToPass:any;
  appAccessDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'sNo',
    'applciationName',
    'accesType',
    'remarks',
    'range',
    'action',
  ];

  minDate: Date = new Date();
  stateInputcontrol: FormControl = new FormControl();

  userTypeList: ConfigCode[] = [];
  requestForList: ConfigCode[] = [];
  allDiscomList: ConfigCode[] = [];
  allStatesList: ConfigCode[] = [];
  selectedDiscoms: ConfigCode[] = [];
  discomList: ConfigCode[] = [];

  cityList: ConfigCode[]= [];
  zoneList: ConfigCode[]= [];
  circleList: ConfigCode[]= [];
  divisionList: ConfigCode[]= [];
  subDivisionList: ConfigCode[]= [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  showFinalForm:boolean=false;


  @ViewChild('discomInput') discomInput: ElementRef<HTMLInputElement>;

  filteredDiscom: Observable<ConfigCode[]>;
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.userdetails = new FormGroup({
      salutation: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      firstName: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      lastName: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      mobileNo: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern('[6-9]\\d{9}'),
      ]),
      email: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.email,
      ]),
    });
    this.employmentDetails = new FormGroup({
      employeeId: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      designation: new FormControl({ value: '', disabled: false }),
      department: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
    this.locationDetails = new FormGroup({
      discomName: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      city: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      zone: new FormControl(
        { value: '', disabled: false },
        // Validators.required
      ),
      circle: new FormControl(
        { value: '', disabled: false },
        // Validators.required
      ),
      division: new FormControl(
        { value: '', disabled: false },
        // Validators.required
      ),
      subdivision: new FormControl(
        { value: '', disabled: false },
        // Validators.required
      ),
    });
    this.applicationDetails = new FormGroup({
      userType: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      requestFor: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      state: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      existingVPNName: new FormControl({ value: '', disabled: false }),
      discomList: new FormControl({ disabled: false }),
    });

    this.VPNDetails = new FormGroup({
      lanMACAddress: new FormControl(
        { value: '', disabled: false },
        [Validators.pattern("^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$"),
        Validators.required]
      ),
      wifiMACAddress: new FormControl(
        { value: '', disabled: false },
        [Validators.pattern("^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$")]
      ),
      vpnAccessFromIndia: new FormControl(
        { value: 'Yes', disabled: false },
        Validators.required
      ),
      countryName: new FormControl({ value: '', disabled: true },
      Validators.required),
    });

    // this.VPNDetails.disable();



    this.filteredDiscom = this.stateInputcontrol.valueChanges.pipe(
      // startWith(null),
      map((state: string | null) =>
        state ? this._filter(state) : this.allDiscomList.slice()
      )
    );

    this.applicationAccess = this.formBuilder.array([]);



    this.objectToPass={
      userdetails:this.userdetails,
      employmentDetails:this.employmentDetails,
      locationDetails:this.locationDetails,
      applicationDetails:this.applicationDetails,
      applicationAccess:this.applicationAccess,
      selectedDiscoms:this.selectedDiscoms,
      VPNDetails:this.VPNDetails
    }



  }

  ngOnInit(): void {
    this.fetchAllUserType();
    this.fetchAllRequestFor();
    this.fetchAllState();
    this.fetchAllApplications();
    this.fetchAllDiscom();
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
  fetchDiscomInState(event:MatSelectChange): void {
      this.spinner = true;
      var queryParams: any = {};
      queryParams['type'] = 'DISCOM';
      queryParams['subtype'] = event.value;

      this.restClient
        .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
        .subscribe({
          next: (result: APIResponse) => {
            this.allDiscomList = result.data as ConfigCode[];
            this.selectedDiscoms=[];
            this.objectToPass.selectedDiscoms=this.selectedDiscoms;
            this.applicationDetails.controls['discomList'].setValue([]);
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
  fetchAllApplications(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'APPLICATION_NAME';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          var allApplicationArray = result.data as ConfigCode[];
          this.applicationAccess = this.formBuilder.array(
            allApplicationArray.map(this.applicationAsFormGroup)
          );
          this.objectToPass.applicationAccess=this.applicationAccess;
          this.appAccessDataSource = new MatTableDataSource(
            this.applicationAccess.controls
          );
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
  fetchAllRequestFor(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'REQUEST_FOR';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.requestForList = result.data as ConfigCode[];
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

  fetchAllUserType(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'USERTYPE';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.userTypeList = result.data as ConfigCode[];
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


  fetchAllDiscom(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.discomList = result.data as ConfigCode[];
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

  fetchDiscomCity(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'CITY';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.cityList = result.data as ConfigCode[];
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

  fetchCityZone(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'ZONE';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.zoneList = result.data as ConfigCode[];
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
  fetchZoneCircle(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'CIRCLE';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.circleList = result.data as ConfigCode[];
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

  fetchCircleDivision(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DIVISION';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.divisionList = result.data as ConfigCode[];
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

  fetchDivisionSubDivision(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'SUBDIVISION';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.subDivisionList = result.data as ConfigCode[];
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
  // addState(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.selectedDiscoms.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();

  //   this.applicationDetails.controls['discomList'].setValue(null);
  // }

  removeDiscom(state: ConfigCode): void {
    const index = this.selectedDiscoms.indexOf(state);
    this.allDiscomList.push(state);
    if (index >= 0) {
      this.selectedDiscoms.splice(index, 1);
    }

    this.applicationDetails.controls['discomList'].patchValue(
      this.selectedDiscoms
    );
  }
  selectedDiscom(event: MatAutocompleteSelectedEvent): void {
    this.selectedDiscoms.push(event.option.value);
    this.discomInput.nativeElement.value = '';
    // this.applicationDetails.controls['discomList'].setValue(this.selectedState);
    this.applicationDetails.controls['discomList'].patchValue(
      this.selectedDiscoms
    );
    const index = this.allDiscomList.indexOf(event.option.value);
    if (index >= 0) {
      this.allDiscomList.splice(index, 1);
    }
  }

  private _filter(value: any): ConfigCode[] {
    var filterValue = '';
    if (value.shortDescription) {
      filterValue = value.shortDescription;
    } else {
      filterValue = value.toLowerCase();
    }
    return this.allDiscomList.filter((state) =>
      state.shortDescription.toLowerCase().includes(filterValue)
    );
  }

  applicationAsFormGroup(configCode: ConfigCode): FormGroup {
    const fg:FormGroup = new FormGroup({
      applicationName: new FormControl(
        { value: configCode.shortCode, disabled: true },
        Validators.required
      ),
      remarks: new FormControl(
        { value: '', disabled: false }
      ),
      accesType: new FormControl({ value: 'VIEWER', disabled: false }),
      appType: new FormControl({ value: 'EXISTING', disabled: false }),
      isRequired: new FormControl(
        { value: false, disabled: false },
        Validators.required
      ),
      start: new FormControl(
        { value: new Date(), disabled: false },
        Validators.required
      ),
      end: new FormControl(
        { value: new Date(), disabled: false },
        Validators.required
      ),
    });

    return fg;
  }
  removeApplication(i: number) {
    this.applicationAccess.removeAt(i);
    this.appAccessDataSource.data = this.appAccessDataSource.data;
  }
  addCustomApplication() {
    if (
      this.applicationAccess.getRawValue()[
        this.applicationAccess.getRawValue().length - 1
      ].applicationName == ''
    ) {
      let snackBarRef = this.snackBar.open(
        'Please Verify Existing Application Record',
        'close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        }
      );
      return;
    }

    this.applicationAccess.push(this.customApplicationAsFormGroup());
    this.appAccessDataSource.data = this.appAccessDataSource.data;
  }

  customApplicationAsFormGroup(): FormGroup {
    const fg = new FormGroup({
      applicationName: new FormControl('', Validators.required),
      accesType: new FormControl({ value: 'VIEWER', disabled: false }),
      remarks: new FormControl({ value: '', disabled: false }),
      appType: new FormControl({ value: 'OTHERS', disabled: false }),
      isRequired: new FormControl(
        { value: false, disabled: false },
        Validators.required
      ),
      start: new FormControl(
        { value: new Date(), disabled: false },
        Validators.required
      ),
      end: new FormControl(
        { value: new Date(), disabled: false },
        Validators.required
      ),
    });
    return fg;
  }

  showForm(){

    // var objectToPass:any={
    //   userdetails:this.userdetails,
    //   employmentDetails:this.employmentDetails,
    //   locationDetails:this.locationDetails,
    //   applicationDetails:this.applicationDetails,
    //   applicationAccess:this.applicationAccess,
    //   selectedDiscoms:this.selectedDiscoms,
    //   VPNDetails:this.VPNDetails
    // }
    // // this.router.navigate(["/public/viewUAMForm"],{skipLocationChange:true,state:objectToPass});
    // this.router.navigate(["/public/viewUAMForm"],{skipLocationChange:true,state:objectToPass});

    this.showFinalForm=true;
  }

  editForm(edit:boolean):any{

    this.applicationAccess.controls.forEach(form => {
      (<FormGroup> form).controls['applicationName'].disable();
    });



    this.showFinalForm=false;
  }

//   appRequiredChanged(event:MatCheckboxChange,appName:string){
// if (event.checked) {
//   if (appName=="VPN") {
//     this.VPNDetails.enable();
//     this.VPNDetails.controls["countryName"].setValue(null);
//     this.VPNDetails.controls["countryName"].disable();
//   }
// }else{
//   if (appName=="VPN") {
//     this.VPNDetails.disable();
//   }
// }
//   }

  vpnCountryChange(event:MatSelectChange){
    if (event.value=="No") {
      this.VPNDetails.controls["countryName"].enable();
    }else{
      this.VPNDetails.controls["countryName"].setValue(null);
      this.VPNDetails.controls["countryName"].disable();
    }
  }

}
