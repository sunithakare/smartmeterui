import { query } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SystemAccess } from 'src/app/ltapp/admin/rolecreation/role-creation.component';
import { APIResponse, ConfigCode, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { AgencyDetails, FindByAgency } from '../ci-agency-allotment-list.component';

@Component({
  selector: 'app-ci-agency-allotment-details',
  templateUrl: './ci-agency-allotment-details.component.html',
  styleUrls: ['./ci-agency-allotment-details.component.css']
})
export class CiAgencyAllotmentDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isEditable: boolean = false;

divisionStore:AllDivisionData[]=[];
stateList:AllAgencyList[]=[];
cityList:AllAgencyList[]=[];
discomList:AllAgencyList[]=[];
@Output() dataSaved: EventEmitter<number>=new EventEmitter();
pageSize = 15;
  currentPage = 0;

  ciRequest:CiAgencyRequest;

  @Input()
  isNavigation:boolean=false;

  @Input()
  agencyDetails:FindByAgency;

  allocationDataStore:any[]=['CI','MI','ENH','O&M'];

  // ciAgencyForm:FormGroup;
  spinner:boolean=false;

  asignedPermission: SystemAccess[] = [];

  ciAgencyForm!:FormGroup;
  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService) { }

  ngOnInit(): void {
    this.ciAgencyForm = new FormGroup({
      state: new FormControl(''),
      discom:new FormControl(''),
      city: new FormControl(''),
      division: new FormControl(['']),
      allocationData:new FormControl(''),
      agency:new FormControl(''),
      allocation:new FormControl(''),
    });
    this.fetchStateList();
    this.fetchCityList();
    this.fetchDiscomList();
  }


  counter:any;
  divisionCode:any;

  ngOnselect(event:MatSelectChange){
    alert(event+" city")
    var queryParam:any={};

    queryParam['state']=this.stateValue;
    queryParam['discom']=this.discomValue;

        queryParam['city']=event.value;




      this.restClient.getwithParam(environment.CI_MASTER_FETCH_DIVISION, queryParam)
    .subscribe({
      next:(result:APIResponse)=>{
        this.divisionStore=result.data as AllDivisionData[];

      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("division data came..!");
      }
    });
  }

  cityValue:AllDivisionData[]=[];

  cityChange(city:any){


      this.spinner = true;
      var queryParams: any = {};
      queryParams['type'] = 'DIVISION_UI';
      queryParams['subtype'] = city;
      this.restClient
        .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
        .subscribe({
          next: (result: APIResponse) => {
            this.allDivisionS = result.data as ConfigCode[];
          },

      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("city in on change");
      }
    })
  }

  ngOnChanges(){
    if(this.agencyDetails == undefined && this.agencyDetails == null){
      this.ciAgencyForm=new FormGroup({
        state:new FormControl(''),
        agency:new FormControl(''),
        city: new FormControl(''),
      division: new FormControl([''],[Validators.required]),
      allocationData:new FormControl('',Validators.required),
      discom:new FormControl('',Validators.required),
      allocation:new FormControl('',Validators.required),
      });
    }
    else{
      this.statePermission(this.agencyDetails.state);
      this.discomPermission(this.agencyDetails.discom);
      this.cityChange(this.agencyDetails.city);
//issue for division lookup..<>

      this.ciAgencyForm=new FormGroup({
        city: new FormControl({value:this.agencyDetails.city,disabled:!this.isEditable || this.isNavigation},[]),
        state:new FormControl({value:this.agencyDetails.state,disabled:!this.isEditable || this.isNavigation},[]),
        discom:new FormControl({value:this.agencyDetails.discom,disabled:!this.isEditable || this.isNavigation},[]),
        // divisionCo

        agency:new FormControl(this.agencyDetails.agency),

      division: new FormControl({value:[this.agencyDetails.division],disabled:!this.isEditable || this.isNavigation},[]),
      allocationData:new FormControl({value:this.agencyDetails.allocationData,disabled:!this.isEditable || this.isNavigation},[]),

      allocation:new FormControl({value:this.agencyDetails.allocation,disabled:!this.isEditable || this.isNavigation},[]),
      });
    }
    // alert(this.agencyDetails.city+"came");

  }
  fetchCityList(){
    var queryParam:any={};
    // queryParam['page']=this.currentPage;
    // queryParam['size']=this.pageSize;
    queryParam['type']='CITY';
    this.restClient.getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParam)
    .subscribe({
      next:(result:APIResponse)=>{
        this.cityList=result.data as AllAgencyList[];
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log('city fetched successfully..!');
      },

    });
  }
  fetchDiscomList(){
    var queryParam:any={};
    queryParam['type']='DISCOM';
    this.restClient.getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParam)
    .subscribe({
      next:(result:APIResponse)=>{
        this.discomList=result.data as AllAgencyList[];
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Discom list SuccessFully fetched..!");
      },

    });
  }

  fetchStateList() {
    // this.spinner = true;

    var queryParams: any = {};
    // queryParams['page']=this.currentPage;
    // queryParams['size']=this.pageSize;
    queryParams['type']='STATE';


    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.stateList = result.data as AllAgencyList[];
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          // this.spinner = false;
        },
      });
  }


stateValue:any;
discomValue:any;
allDiscomList:ConfigCode[]=[];

  agencyStatePermission(event:MatSelectChange){
    let newName= event.value;
    this.stateValue=newName;

    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';
    queryParams['subtype'] = event.value;
    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiscomList = result.data as ConfigCode[];
          // this.selectedDiscoms=[];
          // this.objectToPass.selectedDiscoms=this.selectedDiscoms;
          // this.applicationDetails.controls['discomList'].setValue([]);
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
  allDivisionS:ConfigCode[]=[];
  agencyCityPermission(event:MatSelectChange){
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DIVISION_UI';
    queryParams['subtype'] = event.value;
    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDivisionS = result.data as ConfigCode[];

          // this.selectedDiscoms=[];
          // this.objectToPass.selectedDiscoms=this.selectedDiscoms;
          // this.applicationDetails.controls['discomList'].setValue([]);
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

  statePermission(event:any){
    let newName= event;
    this.stateValue=newName;
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';
    queryParams['subtype'] = event;
    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiscomList = result.data as ConfigCode[];
        },
        error:(err:any)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("state 2 fetched..!")
        }
      });
  }

  allDiv:DivStore[]=[];

  agencyDiscomPermission(event:MatSelectChange){
    let newName= event.value;
    this.discomValue=newName;

    this.spinner = true;
    var queryParams: any = {};
    queryParams['discom'] = event.value;
    alert(event.value);
    this.restClient
      .publicgetwithParam(environment.CIA_DISCOMDATA_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiv = result.data as DivStore[];
          // this.selectedDiscoms=[];
          // this.objectToPass.selectedDiscoms=this.selectedDiscoms;
          // this.applicationDetails.controls['discomList'].setValue([]);
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

  discomPermission(event:any){
    let newName= event;
    this.discomValue=newName;

    this.spinner = true;
    var queryParams: any = {};
    queryParams['discom'] = event;
    this.restClient
      .publicgetwithParam("/common/discomdata", queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiv = result.data as DivStore[];
        },
        error:(err:any)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("discom succesfully fetched...!")
        }
      });
  }

  divisionValue:any;

  agencyDivisionPermission(event:MatSelectChange[]){
    let newName=event;
    this.divisionValue=newName;
    // alert(newName);
  }
  saveCiAgency(){
    console.log("saved..!");
    // alert("saved..!" +this.ciAgencyForm.getRawValue().allocationData);
    this.spinner=true;
    let requestBody: AgencySaveData={
      agency:this.ciAgencyForm.getRawValue().agency,
      state:this.ciAgencyForm.getRawValue().state,
      discom:this.ciAgencyForm.getRawValue().discom,
      city:this.ciAgencyForm.getRawValue().city,
      division:this.ciAgencyForm.getRawValue().division,
      allocation:this.ciAgencyForm.getRawValue().allocation,
      allocationData:this.ciAgencyForm.getRawValue().allocationData,
      asignedPermission:this.asignedPermission,



    };
    alert(this.ciAgencyForm.getRawValue().discom);
    var queryParam:any={};
    let apiURL='';
    alert(this.isNavigation)
    if(this.isNavigation){

      apiURL=environment.CIA_UPDATE;

    }
    else{
      apiURL=environment.CIA_SAVEDATA;
    }
    this.restClient.post(apiURL,requestBody).subscribe({
      next:(res:APIResponse)=>{
        let snackBarRef=this.snackBar.open(
          'Data Saved Successfully',
          'close',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          }
        );
        this.dataSaved.emit(0);

      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Ci allotment saved successfully");
      }
    })
  }





}
export interface AllAgencyList{
  shortCode:string;
}

export interface AllAllocationData{
  ci_agency:string;
  mi_agency:string;

}

export interface AllDivisionData{
  divCode:string;
  count:string;
}

export interface AgencySaveData{
  agency:string;
  state:string;
  discom:string;
  city:string;
  division:string;
  allocation:string;
  allocationData:string;
  asignedPermission:SystemAccess[];
}

export interface DivStore{
  discomName:string;
  city:string;
}

export interface CiAgencyRequest {
  state: string;
  discom: string;
  city: string;

  // asignedPermission: SystemAccess[];
}
