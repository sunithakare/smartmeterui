import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApplicationRequested } from 'src/app/public/register/model/ApplicationRequested';
import { ApproverRemark } from 'src/app/public/register/model/ApproverRemark';
import { Register } from 'src/app/public/register/model/Register';
import { SpocDetails } from 'src/app/public/register/model/SpocDetails';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { RoleList } from '../../admin/rolecreation/role-creation.component';
import { UAMListData } from '../interface/UAMListData';

@Component({
  selector: 'app-list-all-application',
  templateUrl: './list-all-application.component.html',
  styleUrls: ['./list-all-application.component.css']
})
export class ListAllApplicationComponent implements OnInit {

  @Input()
  listview:boolean=false;
  @Input()
  title:string='';


  selectedIndex = 0;
  spinner = false;
  fetchUrl: string = '';
  // for tab 1
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  refId:string='';
  statusSearch:string='';

  statusList: string[] = [];
  displayedColumns: string[] = [
    'referenceId',
    'firstName',
    'employeeId',
    'userType',
    'createdDate'
  ];
  dataSource = new MatTableDataSource<UAMListData>();

  detailsData:UAMInputForm;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) { }

  ngOnInit(): void {

    this.loadData();
      this.fetchAllStatus();
  }

  searchForRefId():void{

  }

  // showDetails(row: any):void{
  //   this.selectedIndex=1;
  // }

  loadData():void{
    this.isLoading = true;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['listview'] = this.listview;

    this.restClient
      .getwithParam(environment.UAM_FETCH_APPLICATIONS_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: UAMListData[] = result.data.content as UAMListData[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.isLoading = false;
        },
        complete: () => {
          console.log('UAM List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }
  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }
  searchWithFilter():void{
    if(this.refId=="" && this.statusSearch==''){
      var message='Enter Atleast One Criteria ';
      if (this.listview && this.statusList.length<2) {

        var message='Enter Reference Id';
      }

      let snackBarRef = this.snackBar.open(message, 'close', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
      });
    }


    this.currentPage = 0;
    this.isLoading = true;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['listview'] = this.listview;
    queryParams['refId'] = this.refId;

    if(this.statusSearch!=undefined && this.statusSearch!=null && this.statusSearch!=''){
      queryParams['status'] = this.statusSearch;
    }

    this.restClient
      .getwithParam(environment.UAM_FETCH_APPLICATIONSWITH_FILTER_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: UAMListData[] = result.data.content as UAMListData[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.isLoading = false;
        },
        complete: () => {
          console.log('UAM List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    this.loadData();

}

  fetchAllStatus() {

    var queryParams: any = {};

    this.restClient
      .getwithParam(
        environment.UAM_VALID_STATUS_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.statusList = result.data as string[];
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Status List Fetch Complete ');
        },
      });
  }

showDetails(row: any):void{
  this.refId=row.referenceId;
  this.spinner = true;
  var queryParams: any = {};

  this.restClient
    .get(environment.UAM_VIEW_DETAILS_API+"/"+row.referenceId)
    .subscribe({
      next: (result: APIResponse) => {
          var formData:Register=result.data as Register;
         var details:UAMInputForm= this.generateFormData(formData);
          details.selectedDiscoms=formData.applicationDetails.discomList;
this.detailsData=details;
          // this.selectedDiscoms = state.selectedDiscoms;
      },
      error: (err: any) => {
        console.log(err);
        this.spinner = false;
        // this.router.navigate(['/home']);
      },
      complete: () => {

  this.selectedIndex=1;
        this.spinner = false;
      },
    });
}
generateFormData(formData: Register):UAMInputForm {
  var userdetails = new FormGroup({
    salutation: new FormControl({ value: formData.userDetails.salutation, disabled: false }),
    firstName:  new FormControl({ value: formData.userDetails.firstName, disabled: false }),
    lastName:   new FormControl({ value: formData.userDetails.lastName, disabled: false }),
    mobileNo:   new FormControl({ value: formData.userDetails.mobileNo, disabled: false }),
    email:      new FormControl({ value: formData.userDetails.email, disabled: false }),
  });
  var employmentDetails = new FormGroup({
    employeeId:   new FormControl({ value: formData.employmentDetails.employeeId, disabled: false }),
    designation:  new FormControl({ value: formData.employmentDetails.designation, disabled: false }),
    department:   new FormControl({ value: formData.employmentDetails.department, disabled: false }),
  });
  var locationDetails = new FormGroup({
    discomName:   new FormControl({ value: formData.locationDetails.discomName, disabled: false }),
    city:         new FormControl({ value: formData.locationDetails.city, disabled: false }),
    zone:         new FormControl({ value: formData.locationDetails.zone, disabled: false }),
    circle:       new FormControl({ value: formData.locationDetails.circle, disabled: false }),
    division:     new FormControl({ value: formData.locationDetails.division, disabled: false }),
    subdivision:  new FormControl({ value: formData.locationDetails.subdivision, disabled: false }),
  });
  var applicationDetails = new FormGroup({
    userType:         new FormControl({ value: formData.applicationDetails.userType, disabled: false }),
    requestFor:       new FormControl({ value: formData.applicationDetails.requestFor, disabled: false }),
    existingVPNName:  new FormControl({ value: formData.applicationDetails.existingVPNName ,disabled: false }),
    state: new FormControl({ value: formData.applicationDetails.state, disabled: false }),
    status: new FormControl({ value: formData.applicationDetails.status, disabled: false }),
    discomList: new FormControl({value: formData.applicationDetails.discomList, disabled: false }),
  });

  var VPNDetails = new FormGroup({
    lanMACAddress: new FormControl({ value: formData.vpnDetails.lanMACAddress, disabled: false }),
    wifiMACAddress: new FormControl({ value: formData.vpnDetails.wifiMACAddress, disabled: false }),
    vpnAccessFromIndia: new FormControl({ value: formData.vpnDetails.vpnAccessFromIndia, disabled: false }),
    countryName: new FormControl({ value: formData.vpnDetails.countryName, disabled: true }),
  });

  var applicationAccess = this.formBuilder.array(formData.applicationRequested.map(this.applicationAsFormGroup));



  var approverRemarks = this.formBuilder.array(formData.approverRemarks.map(this.approverRemarksAsFormGroup));

  var array :SpocDetails[]=[];


  var spocdetails  = new FormArray(array.map(this.spocDetailsAsFormGroup));
  if (formData.spocData) {
  var spocdetails = this.formBuilder.array(formData.spocData.map(this.spocDetailsAsFormGroup));
  }

  var remarksData=new FormGroup({
    userRemarks: new FormControl( { value: '', disabled: false }),
     spocRemarks: new FormControl({ value: '', disabled: false }
    ),
});

  var inputForm:UAMInputForm={
    userdetails: userdetails,
    employmentDetails: employmentDetails,
    locationDetails: locationDetails,
    applicationDetails: applicationDetails,
    applicationAccess: applicationAccess,
    VPNDetails: VPNDetails,
    remarksData: remarksData,
    approverRemarks: approverRemarks,
    spocdetails: spocdetails,
    selectedDiscoms: []
  }
return inputForm;
}
spocDetailsAsFormGroup(spocData: SpocDetails): FormGroup {
  const fg = new FormGroup({
    username: new FormControl({ value: spocData.username, disabled: false }),
    appUrls: new FormControl({ value: spocData.appUrls, disabled: false }),
    ouName: new FormControl({ value: spocData.ouName, disabled: false }),
    securityGroups: new FormControl({ value: spocData.securityGroups, disabled: false }),
    systemDestinationIpSubnets: new FormControl({ value: spocData.systemDestinationIpSubnets, disabled: false }),
    serviceSshHttps: new FormControl({ value: spocData.serviceSshHttps, disabled: false }),
    customPorts: new FormControl({ value: spocData.customPorts, disabled: false }),
  });
  return fg;
}


applicationAsFormGroup(appRequest: ApplicationRequested): FormGroup {
  var fg ;
 if( appRequest.status=='Reject'){
  fg = new FormGroup({
    applicationName: new FormControl({ value: appRequest.applicationName, disabled: true }),
    accesType: new FormControl({ value: appRequest.accesType, disabled: true }),
    isRequired: new FormControl({ value: appRequest.isRequired, disabled: true }),
    start: new FormControl({ value: appRequest.start, disabled: true }),
    end: new FormControl({ value: appRequest.end, disabled: true }),
    status: new FormControl({ value: appRequest.status, disabled: true }),
    remarks: new FormControl({ value: appRequest.remarks, disabled: true }),
  });
 }else{
  fg = new FormGroup({
    applicationName: new FormControl({ value: appRequest.applicationName, disabled: true }),
    accesType: new FormControl({ value: appRequest.accesType, disabled: true }),
    isRequired: new FormControl({ value: appRequest.isRequired, disabled: true }),
    start: new FormControl({ value: appRequest.start, disabled: false }),
    end: new FormControl({ value: appRequest.end, disabled: false }),
    status: new FormControl({ value: appRequest.status, disabled: false }),
    remarks: new FormControl({ value: appRequest.remarks, disabled: true }),
  });
 }

  return fg;
}

approverRemarksAsFormGroup(approverRemarks: ApproverRemark): FormGroup {
  const fg = new FormGroup({
    approvedDate: new FormControl({ value: approverRemarks.approvedDate, disabled: true }),
    approverLevel: new FormControl({ value: approverRemarks.approverLevel, disabled: false }),
    remarks: new FormControl({ value: approverRemarks.remarks, disabled: false }),
    approverName: new FormControl({ value: approverRemarks.approverName, disabled: false }),
  });
  return fg;
}

}

export interface UAMInputForm{
  userdetails: FormGroup;
  employmentDetails: FormGroup;
  locationDetails: FormGroup;
  applicationDetails: FormGroup;
  applicationAccess: FormArray;
  VPNDetails: FormGroup;
  remarksData: FormGroup;
  approverRemarks: FormArray;
  selectedDiscoms: ConfigCode[];
  spocdetails:FormArray;
}
