import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-return-from-subcontractor-list',
  templateUrl: './return-from-subcontractor-list.component.html',
  styleUrls: ['./return-from-subcontractor-list.component.css']
})
export class ReturnFromSubcontractorListComponent implements OnInit {
isLoading=false;
selectedIndex= 0;
isEditable=false;
spinner = false;
isDetailsEditable: boolean = false;
isNavigation: boolean = false;
totalRows= 0;
pageSize= 15;
currentPage= 0;
pageSizeOptions: number[]=[20,40,60,80,100];
filtered=false;
 @ViewChild(MatPaginator) paginator:MatPaginator;
 @ViewChild(MatSort) sort:MatSort;

displayedColumns: string[] = ["trnId","transStatus","discom","warehouseName","subcontractor","docNo","docDate",
                               "itemGroup","itemModelName",'supplier','itemCategory','itemStatus',
                                'submite','recieved','docView'];
dataSource= new MatTableDataSource<any>();

discomSearch:string='';
warehouseSearch:string='';
subcontractorSearch:string='';
itemGroupSearch:string='';
itemStatusSearch:string='';
itemModelNameSearch:string='';


returnFromSubcontractorResponse: ReturnfromsubcontractorData;




  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadreturnfromsubcontractordata();
    this.isDetailsEditable=true;

  }

  onChangePage(pe: PageEvent) {
    // this.pageSize = pe.pageSize;
    // this.currentPage = pe.pageIndex;
    this.isLoading = true;
    this.filtered = false;
    // var queryParams: any = {};
    // queryParams['page'] = pe.pageIndex;
    // queryParams['size'] = pe.pageSize;
    // queryParams['discom']=this.Discom;

    // this.restClient
    //   .getwithParam(environment.INVENTORY_RETURN_FROM_SUBCONTRACTOR_LIST_DATA, queryParams)
    //   .subscribe({
    //     next: (result: PageableResponse) => {
    //       var content: ReturnfromsubcontractorData[] = result.data.content as ReturnfromsubcontractorData[];

    //       this.dataSource.data = content;
    //       this.totalRows = result.data.totalElements;
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //       let snackBarRef = this.snackBar.open('Server Error', 'close', {
    //         horizontalPosition: 'center',
    //         verticalPosition: 'bottom',
    //         duration: 3000,
    //       });
    //       this.isLoading = false;
    //     },
    //     complete: () => {
    //       console.log('InwardImport List Fetch Complete ');
    //       this.isLoading = false;
    //     },
    //   });

  }

  // Discom:string='DVVNL';
  loadreturnfromsubcontractordata(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    // queryParams['discom']=this.Discom;

    this.restClient
      .getwithParam('/inventory/returnFromSubcontractor', queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: ReturnfromsubcontractorData[] = result.data.content as ReturnfromsubcontractorData[];

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
          console.log('InwardImport List Fetch Complete ');
          this.isLoading = false;
        },
      });

  }
  navToDetails(row:any){
    this.selectedIndex =1;
    this.returnFromSubcontractorResponse=row;
    
    
  }


  addNewsubcontractorData():void{
    this.isNavigation=false;
    this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadreturnfromsubcontractordata();
  }
  searchWithFilter(){
    this.currentPage=0;
    this.fetchFilterData();
  }

  fetchFilterData():void{
    this.isLoading=true;
    this.filtered=true;



    var queryParams : any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom'] = this.discomSearch;
    queryParams['warehouseName'] = this.warehouseSearch;
    queryParams['subcontractor'] = this.subcontractorSearch;
    queryParams['itemGroup'] = this.itemGroupSearch;
    queryParams['itemStatus'] = this.itemStatusSearch;
    queryParams['itemModelName'] = this.itemModelNameSearch;

    this.restClient.getwithParam('/inventory/fetchReturnSucontractorFilter',queryParams)
    .subscribe({
      next: (result: PageableResponse) => {
        var content: RoleList[] = result.data.content as RoleList[];

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

  }
export interface ReturnfromsubcontractorData{
  id: string
  discom: string
  warehouseName: string
  subcontractorType: string
  subcontractor: string
  docNo: any
  docDate: string
  srnNo: string
  srnDate: string
  itemGroup: string
  itemModelName: string
  supplier: string
  itemCategory: string
  itemStatus: string
  quantity: number
  transporter: string
  lrNo: string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
  lrDate:string
  docUpload:string
  serialBasedDetailList: SerialBasedDetailList[]
 }

 export interface RoleList {
  discom?: string;
  warehouseName?:string;
  subcontractor?:string;
  itemGroup? :string;
  itemStatus?:string;
  itemModelName? : string;
}
export interface SerialBasedDetailList{
  srNo:string;
  remarks:string;
}
