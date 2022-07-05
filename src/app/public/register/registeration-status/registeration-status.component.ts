import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse, ConfigCode, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { ApplicationRequested } from '../model/ApplicationRequested';
import { ApproverRemark } from '../model/ApproverRemark';
import { Register } from '../model/Register';
import { SpocDetails } from '../model/SpocDetails';

@Component({
  selector: 'app-registeration-status',
  templateUrl: './registeration-status.component.html',
  styleUrls: ['./registeration-status.component.css']
})
export class RegisterationStatusComponent implements OnInit {


  uuid:string="";
  fetchUrl:string="";
  spinner = false;



  userdetails: FormGroup;
  employmentDetails: FormGroup;
  locationDetails: FormGroup;
  applicationDetails: FormGroup;
  VPNDetails: FormGroup;
  applicationAccess: FormArray;
  approverRemarks: FormArray;
  spocdetails: FormArray;
  remarksData: FormGroup;


  appAccessDataSource = new MatTableDataSource<any>();
  approverRemarksDataSource = new MatTableDataSource<any>();
  spocDetailDataSource = new MatTableDataSource<any>();
  selectedDiscoms: ConfigCode[] = [];

  displayedAppAccess: string[] = [
    'sNo',
    'applciationName',
    'accesType',
    'remarks',
    'status',
    'range',
  ];
  displayedApproverRemarks: string[] = [
    'sNo',
    'approverLevel',
    'approverName',
    'changedDate',
    'remarks'
  ];

  displayedSpocData: string[] = [
    'username',
    'appUrls',
    'ouName',
    'securityGroups',
    'systemDestinationIpSubnets',
    'serviceSshHttps',
    'customPorts'

  ];

  constructor(
    private restClient: HttpclientService,
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // this.billdate = new FormControl(moment());
      // this.billdate.value.month(this.reportdate.value.month() + 1);
      this.uuid = params['uuid'];
      this.fetchUrl=environment.UAM_VIEW_STATUS_API;
      if (this.uuid != undefined || this.uuid != null) {
        this.fetchUrl = this.fetchUrl + '/' + this.uuid;
      }else{
        this.router.navigate(['/home']);
      }
      this.loadData();
    });
  }
  loadData(){
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'STATE';

    this.restClient
      .publicgetwithParam(this.fetchUrl, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
            var formData:Register=result.data as Register;
            this.generateFormData(formData);
            // this.selectedStates=formData.applicationDetails.stateList;

            this.selectedDiscoms = formData.applicationDetails.discomList;
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
          this.router.navigate(['/home']);
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }
  generateFormData(formData: Register) {
    this.userdetails = new FormGroup({
      salutation: new FormControl({ value: formData.userDetails.salutation, disabled: false }),
      firstName:  new FormControl({ value: formData.userDetails.firstName, disabled: false }),
      lastName:   new FormControl({ value: formData.userDetails.lastName, disabled: false }),
      mobileNo:   new FormControl({ value: formData.userDetails.mobileNo, disabled: false }),
      email:      new FormControl({ value: formData.userDetails.email, disabled: false }),
    });
    this.employmentDetails = new FormGroup({
      employeeId:   new FormControl({ value: formData.employmentDetails.employeeId, disabled: false }),
      designation:  new FormControl({ value: formData.employmentDetails.designation, disabled: false }),
      department:   new FormControl({ value: formData.employmentDetails.department, disabled: false }),
    });
    this.locationDetails = new FormGroup({
      discomName:   new FormControl({ value: formData.locationDetails.discomName, disabled: false }),
      city:         new FormControl({ value: formData.locationDetails.city, disabled: false }),
      zone:         new FormControl({ value: formData.locationDetails.zone, disabled: false }),
      circle:       new FormControl({ value: formData.locationDetails.circle, disabled: false }),
      division:     new FormControl({ value: formData.locationDetails.division, disabled: false }),
      subdivision:  new FormControl({ value: formData.locationDetails.subdivision, disabled: false }),
    });
    this.applicationDetails = new FormGroup({
      userType:         new FormControl({ value: formData.applicationDetails.userType, disabled: false }),
      requestFor:       new FormControl({ value: formData.applicationDetails.requestFor, disabled: false }),
      existingVPNName:  new FormControl({ value: formData.applicationDetails.existingVPNName ,disabled: false }),
      state: new FormControl({ value: formData.applicationDetails.state, disabled: false }),
      status: new FormControl({ value: formData.applicationDetails.status, disabled: false }),
      discomList: new FormControl({value: formData.applicationDetails.discomList, disabled: false }),
    });

    this.VPNDetails = new FormGroup({
      lanMACAddress: new FormControl({ value: formData.vpnDetails.lanMACAddress, disabled: false }),
      wifiMACAddress: new FormControl({ value: formData.vpnDetails.wifiMACAddress, disabled: false }),
      vpnAccessFromIndia: new FormControl({ value: formData.vpnDetails.vpnAccessFromIndia, disabled: false }),
      countryName: new FormControl({ value: formData.vpnDetails.countryName, disabled: true }),
    });

    this.applicationAccess = this.formBuilder.array(formData.applicationRequested.map(this.applicationAsFormGroup));

    this.appAccessDataSource = new MatTableDataSource(
      this.applicationAccess.controls
    );

    this.approverRemarks = this.formBuilder.array(formData.approverRemarks.map(this.approverRemarksAsFormGroup));

    this.approverRemarksDataSource = new MatTableDataSource(
      this.approverRemarks.controls
    );
    var array :SpocDetails[]=[];


    this.spocdetails  = new FormArray(array.map(this.spocDetailsAsFormGroup));
    if (formData.spocData) {
      this.spocdetails = this.formBuilder.array(formData.spocData.map(this.spocDetailsAsFormGroup));
    }

    this.spocDetailDataSource = new MatTableDataSource(
      this.spocdetails.controls
    );
    this.remarksData=new FormGroup({
      userRemarks: new FormControl(
        { value: formData.remarksData.userRemarks, disabled: false }),
      spocRemarks: new FormControl(
        { value: formData.remarksData.spocRemarks, disabled: false }
      ),
  });

    this.userdetails.disable();
    this.employmentDetails.disable();
    this.locationDetails.disable();
    this.applicationDetails.disable();
    this.applicationAccess.disable();
    this.approverRemarks.disable();
    this.VPNDetails.disable();
    this.spocdetails.disable();

  }


  applicationAsFormGroup(appRequest: ApplicationRequested): FormGroup {
    const fg = new FormGroup({
      applicationName: new FormControl({ value: appRequest.applicationName, disabled: true }),
      accesType: new FormControl({ value: appRequest.accesType, disabled: false }),
      isRequired: new FormControl({ value: appRequest.isRequired, disabled: false }),
      start: new FormControl({ value: appRequest.start, disabled: false }),
      end: new FormControl({ value: appRequest.end, disabled: false }),
      status: new FormControl({ value: appRequest.status, disabled: false }),
      remarks: new FormControl({ value: appRequest.remarks, disabled: false }),
    });
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


}

