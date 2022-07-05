import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse, APIResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ci-agency-list',
  templateUrl: './ci-agency-list.component.html',
  styleUrls: ['./ci-agency-list.component.css']
})
export class CiAgencyListComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  fetchUrl: string ='';//for checking
  isLoading = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  isEditable: boolean = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filtered=false;

  displayedColumns: string[] = ['agencyType', 'agencyCode', 'agencyName', 'agencyManager', 'mobile','status'];
  
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>();

  CIAgencyDetailsResponse: AgencyDetailsResponse;


  agencyCodeSearch : string='';
  agencyTypeSearch : string='';
  agencyNameSearch : string='';
  agencyManager : string='';
  landmark : String='';
  status :string='';
  mobile:string='';
  email : string='';

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.loadData();
    
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


  fetchFilteredData():void{
    this.isLoading = true;
    this.filtered =true;

    var queryParams: any = {};
    queryParams['page']=this.currentPage;
    queryParams['size']=this.pageSize;
    queryParams['agencyCode']=this.agencyCodeSearch;
    queryParams['agencyType']=this.agencyTypeSearch;
    queryParams['agencyName']=this.agencyNameSearch;
    queryParams['agencyManager']=this.agencyManager;
    queryParams['status']=this.status;
    queryParams['mobile']=this.mobile;
    queryParams['email']=this.email;
    queryParams['landmark']=this.landmark;
    

    this.restClient.getwithParam(environment.FILTER_AGENCY_CREATION_API, queryParams)
   .subscribe({
     next: (result:PageableResponse)=>{
       var content: AgencyDataSearch[] = result.data.content as AgencyDataSearch[];
       this.dataSource.data=content;
       this.totalRows=result.data.totalElements;
       if(content.length == 0){
         let snackBarRef=this.snackBar.open(
           'No data found here for filter','close',
           {
             horizontalPosition:'center',
             verticalPosition:'bottom',
             duration:2000,
           }
         );
       }
     },
     error:(err:any)=>{
       console.log(err);
       this.isLoading=false;
     },
     complete:()=>{
       console.log('successful');
       this.isLoading=false;
     },
   });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadData() {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.FETCH_AGENCY_CREATION_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: AgencyData[] = result.data.content as AgencyData[];

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
          console.log('Agency Creation successful ');
          this.isLoading = false;
        },
      });
  }


// navigation list to details page
  showAgencyDetails(row: any) {
     this.spinner = true;

     var queryParams: any ={};
    //  queryParams['agencyType']=row.agencyType;
     queryParams['agencyCode']=row.agencyCode;
    
     this.restClient.getwithParam(environment.LIST_TO_DETAILS_NAVIGATION_AGENCY_CREATION_API,queryParams)
     .subscribe({
       next:(results:APIResponse) =>{
        //  let CIAgencyData =results.data as AgencyDetailsResponse;
         this.CIAgencyDetailsResponse =results.data as AgencyDetailsResponse;
        
         this.isNavigation= true;
         this.selectedIndex= 1;
         this.isEditable=true;
       },
       error:(err:any) => {
         console.log(err);
         let snackBarRef = this.snackBar.open('server error' ,'close',{
           horizontalPosition:'center',
          verticalPosition:'bottom',
          duration :3000,
                });
this.spinner = false;
       },
       complete: () => {
         console.log('Agency List Fetch Complete');
         this.spinner =false;
       },
      });
  }


  addNewAgency():void{

  }
}

export interface AgencyData{
  agencyType:string;
  agencyCode:string;
  agencyName:string;
  agencyManager:string;
  landmark : string;
  mobile:string;
  email : string;
  status:string;
}
export interface AgencyDataSearch{
  agencyType? : string;
  agencyCode? : string;
  agencyName? : string;
  agencyManager? : string;
  email? : string;
  landmark? : string;
  status? : string;
  mobile? : string;
}

export interface AgencyDetailsResponse{
  agencyType:string;
  agencyCode:string;
  agencyName:string;
  agencyManager:string;
  mobile:string;
  email : string;
  landmark : string;
  status:string;
}
export interface AgencyDetails{
   agencyCode:string;
    agencyType:string;
    agencyManager:string;
    agencyName:string;
    mobile:string;
    email : string;
    landmark :string;
    status : string;
}
