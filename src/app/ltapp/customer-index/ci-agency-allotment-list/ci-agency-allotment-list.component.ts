import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { SystemAccess } from '../../admin/rolecreation/role-creation.component';
import { AgencyData } from '../ci-agency-list/ci-agency-list.component';

@Component({
  selector: 'app-ci-agency-allotment-list',
  templateUrl: './ci-agency-allotment-list.component.html',
  styleUrls: ['./ci-agency-allotment-list.component.css']
})
export class CiAgencyAllotmentListComponent implements OnInit {

isEditable:boolean=false;
  agencyDetails: AgencyDetails={
    allocationData: '',
            allocation: '',
            divisionCounts: '',
            city: '',
            division:[''] ,
            agency: '',
            state: '',
            discom: '',
    //         permissionsList: [],
    // asignedPermission: [],
  };



  allStatesList: ConfigCode[] = [];
  division!:string;
  agency!:string;
  discom!:string;
  state!:string;
  city!:string;
  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filtered=false;

  displayedColumns: string[] = ['state', 'discom', 'city',  'division','agency'];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<AgencyAllotmentData>();

  agencyCodeSearch:string='';

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { 

    this.applicationDetails = new FormGroup({
      // userType: new FormControl(
      //   { value: '', disabled: false },
      //   Validators.required
      // ),
      agency: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      state: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      discom: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      city: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      division: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      // existingVPNName: new FormControl({ value: '', disabled: false }),
      // discomList: new FormControl({ disabled: false }),
    });
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.getAllState();
    this.getAllDiscom();
    // this.allDiscomStore;
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }

  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllState(): void {
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
  
  getAllDiscom(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';
    this.restClient
      .publicgetwithParam(environment.FETCH_DISCOMS_IN_STATES_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiscomList = result.data as ConfigCode[];
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

  userTypeList: ConfigCode[] = [];
  requestForList: ConfigCode[] = [];
  allDiscomList: ConfigCode[] = [];
  selectedDiscoms: ConfigCode[] = [];
  discomList: ConfigCode[] = [];

  cityList: ConfigCode[]= [];
  zoneList: ConfigCode[]= [];
  circleList: ConfigCode[]= [];
  divisionList: ConfigCode[]= [];
  subDivisionList: ConfigCode[]= [];

  applicationDetails!: FormGroup;
  objectToPass:any;

  getDiscomInState(event:MatSelectChange): void {
    
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
allDiscomStore: ConfigCode[] = [];
allCityStore: ConfigCode[] = [];
allDivisionStore: ConfigCode[] = [];
  getDiscomCoState(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['discom'] = event.value;
    // queryParams['subtype'] = event.value;
    
    this.restClient
      .publicgetwithParam(environment.CIA_DISCOMDATA_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDiscomStore = result.data as ConfigCode[];
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
      queryParams['type'] = 'ZONE';
    queryParams['subtype'] = event.value;
      this.restClient
    .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
    .subscribe({
      next: (result: APIResponse) => {
        this.allCityStore = result.data as ConfigCode[];},});

        // queryParams['type'] = 'DIVISION';
        // queryParams['subtype'] = event.value;
        //   this.restClient
        // .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
        // .subscribe({
        //   next: (result: APIResponse) => {
        //     this.allDivisionStore = result.data as ConfigCode[];},});
        
  }
allDivisionS: ConfigCode[] = [];
  getDiscomCoCity(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DIVISION_UI';
    queryParams['subtype'] = event.value;
    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDivisionS = result.data as ConfigCode[];
          alert(this.allDivisionS);
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

      // queryParams['type'] = 'DIVISION';
      //    this.allDivisionS.forEach(val => {
      //     queryParams['subtype'] =val.shortCode;  
        
      //   alert(val.shortCode+"done");
      //     this.restClient
      //   .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      //   .subscribe({
      //     next: (result: APIResponse) => {
      //       this.allDivisionStore = result.data as ConfigCode[];},});
      //     });
  }

  getDivisionInCity(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'AGENCY';
    queryParams['subtype'] = event.value;
    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.allDivisionStore = result.data as ConfigCode[];
          alert(this.allDivisionStore);
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
    
          
    
  
  
  fetchFilteredData(){
    this.isLoading = true;
    this.filtered = true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['city'] = this.city;
    queryParams['state']=this.state;
queryParams['discom']=this.discom;
queryParams['division']=this.division;
queryParams['agency']=this.agency;

    this.restClient
      .getwithParam(
        "/CIAgencyAlotment/filterUserDetails",
        queryParams
      )
      .subscribe({
        next: (result: PageableResponse) => {
          var content: AgencyAllotmentData[] = result.data.content as AgencyAllotmentData[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
          if (content.length == 0) {
            let snackBarRef = this.snackBar.open(
              'No Data Found For the Filter',
              'close',
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 3000,
              }
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.isLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  
  }
allotData!:any;

  loadData():void{
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.CIA_FIND_CI_AGENCY_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: AgencyAllotmentData[] = result.data.content as AgencyAllotmentData[];

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
          console.log('Role List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }

  showDetails(row: any) {
    this.spinner = true;
    var queryParams:any={};
    queryParams['agency']=row.agency;

    this.restClient.getwithParam(environment.CIA_FIND_BY_AGENCY,queryParams)
    .subscribe({
      next:(res:APIResponse)=>{
        this.agencyDetails=res.data as FindByAgency;
        
       
        this.isNavigation=true;
        // this.isEditable=true;
        this.selectedIndex=1;
        
        // alert(this.agencyDetails);
        
      },
      error:(err:any)=>{
        console.log(err);
        let snackBarRef=this.snackBar.open('Server Error','close',{
          horizontalPosition:'center',
          verticalPosition:'bottom',
          duration:3000,
        });
        this.spinner=false;
      },
      complete:()=>{
        console.log('fetching by agency success');
        this.spinner=false;
      },
    });
  }


  addNewAgency():void{

  }
}

export interface FindByAgency{
  allocationData: string,
            allocation: string,
            divisionCounts: string,
            city: string,
            division: string[],
            agency: string,
            state: string,
            discom: string,
            // permissionsList:SystemAccess[],
            // asignedPermission:SystemAccess[],
}

export interface AgencyDetails{
  allocationData: string,
            allocation: string,
            divisionCounts: string,
            city: string,
            division: string[],
            agency: string,
            state: string,
            discom: string,
            // permissionsList:SystemAccess[],
            // asignedPermission:SystemAccess[],
}

export interface AgencyAllotmentData{
  state:string;
  discom:string;
  city:string;
  division:string;
  agency:string;
}