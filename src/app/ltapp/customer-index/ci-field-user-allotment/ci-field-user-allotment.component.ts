import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse, APIResponse, ConfigCode } from 'src/app/services/httpclient.service';
import { environment} from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-ci-field-user-allotment',
  templateUrl: './ci-field-user-allotment.component.html',
  styleUrls: ['./ci-field-user-allotment.component.css']
})
export class CiFieldUserAllotmentComponent implements OnInit {

  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filtered=false;

  displayedColumns: string[] = ['state', 'discom', 'city',  'division','agency',  'fieldUser','allotedDivision'];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>();

  detailResponse: FieldUserDetail = {
    fieldUser:'',
    mobile:'',
    userId: '',
    divisionId:'',
    agency:'',
    allocationDatatype:'',
   allocationId: '',
   // allocationDataType: '',
  };

  // fieldUserNameSearch:string='';
  // agency:string='';
  // fieldUser:string='';

searcher:any={
  fieldUser:"",
  agency:"",
  state:"",
  discom:"",
  city:"",
  division:""
};


totalStatesList: ConfigCode[] = [];
cityList: ConfigCode[]= [];
selectedDiscoms: ConfigCode[] = [];
discomList: ConfigCode[] = [];
divisionList:ConfigCode[] = [];
//circleList :ConfigCode[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.getAllState();
    
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


  getAllState(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'STATE';

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.totalStatesList = result.data as ConfigCode[];
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

  getDiscomInState(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DISCOM';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
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

  getCityInDiscom(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'ZONE';
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
  // getCircleInCity(event:MatSelectChange): void {
  //   this.spinner = true;
  //   var queryParams: any = {};
  //   queryParams['type'] = 'DIVISION_UI';
  //   queryParams['subtype'] = event.value;

  //   this.restClient
  //     .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
  //     .subscribe({
  //       next: (result: APIResponse) => {
  //         this.circleList = result.data as ConfigCode[];
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         this.spinner = false;
  //       },
  //       complete: () => {
  //         this.spinner = false;
  //       },
  //     });
  // }
  getDivisionInCity(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DIVISION_UI';
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
  divisionStore:any;
  getDivision(event:MatSelectChange): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'DIVISION_UI';
    queryParams['subtype'] = event.value;

    this.restClient
      .publicgetwithParam(environment.FETCH_CONFIG_CODE_LIST_SUBTYPE_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.divisionStore = result.data as ConfigCode[];
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

  


  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.pagina tor;
    this.dataSource.sort = this.sort;
  }


  fetchFilteredData(){
    this.isLoading=true;
    this.filtered=true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['stateId'] = this.searcher.state;
    queryParams['discomId'] = this.searcher.discom;
    queryParams['city'] = this.searcher.city;
    //queryParams['circle'] = this.searcher.circle;
    queryParams['divisionId'] = this.searcher.division;
    queryParams['agency'] = this.searcher.agency;
    queryParams['fieldUser'] = this.searcher.fieldUser;
    
    
    this.restClient
    .getwithParam(
      '/fieldUserAllotment/getAllDatawithfilter',
      queryParams
    )
    .subscribe({
      next: (result: PageableResponse) => {
        var content: FieldUserAllotmentList[] = result.data.content as FieldUserAllotmentList[];

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


  loadData():void{
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.FETCH_CI_USER_ALLOTMENT, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: FieldUserAllotmentList[] = result.data.content as FieldUserAllotmentList[];
         
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
          console.log('FieldUserAllotment List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }

 
  showDetails(row: any) {
     this.spinner = true;

     var queryParams: any ={};
     queryParams['fieldUser'] = row.fieldUser;

     this.restClient.getwithParam(environment.FETCH_FIELD_USER_ALLOTMENT_DETAILS_API, queryParams)
     .subscribe({
       next: (result: APIResponse) => {
         let agecnyData = result.data as AgecyDetailsResponse;
         this.detailResponse = {
          fieldUser: agecnyData.fieldUser,
          mobile: agecnyData.mobile,
          userId: agecnyData.userId,
          divisionId: agecnyData.divisionId,
          agency:agecnyData.agency,
          allocationDatatype: agecnyData.allocationDatatype,
         allocationId: agecnyData.allocationId,
          //allocationDataType: agecnyData.allocationDatatype,
         };
         this.isNavigation = true;
         this.selectedIndex = 1;
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
         console.log('Agency List Fetch Complete ');
         this.spinner = false;
       }
     });
  }


  addNewAgency():void{
 
  }
}
export interface FieldUserAllotmentList{
  stateId?:string;
  discomId?:string;
  city?:string;
  divisionId?:string;
  agency?:string;
  allocationDatatype?:string;
  allocation?:string;
  fieldUser?:string;
  allottedDivision?:string;
}

export interface AgecyDetailsResponse{
 fieldUser: string;
 mobile: string;
 userId: string;
 divisionId: string;
 agency:string;
 allocationDatatype: string;
 allocationId: string;


}
export interface FieldUserDetail{
  fieldUser:string;
  mobile:String;
  userId: string;
  divisionId: string;
  agency: string;
  allocationId: string;
  allocationDatatype: string;
}