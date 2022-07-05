import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inward-import',
  templateUrl: './inward-import.component.html',
  styleUrls: ['./inward-import.component.css']
})
export class InwardImportComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
@Input()
isNavigation: boolean = false;
@Input()
isEditable: boolean = false;
filtered=false;

inwardImportResponse : InwardImportListData={
  id: '',
  discom:'',
  warehouseName: '',
  supplier: '',
  invoiceNo: '',
  invoiceDate: '',
  ginNo: '',
  ginDate: '',
  itemGroup: '',
  itemModelName: '',
  itemSupplier: '',
  itemCategory: '',
  quantity: 0,
  itemStatus: '',
  transporter: '',
  lrNo: '',
  lrDate:'',
  vehicleNo: '',
  driverName: '',
  contactNo: '',
  remark: '',
 // warrantyMonth: '',
  pdiDate: '',
  stockType: '',
  // dataFileId:'',
  // documentId:'',
  // aimsInwardSupplierDetails:[]
}
  dataSource = new MatTableDataSource<any>();
  discomSearch: string='';
  supplierSearch:string='';
  itemGroupSearch:string='';
  itemModelNameSearch:string='';
  displayedColumns: string[] = ['id','discom','warehouseName','supplier','invoiceNo','invoiceDate','itemGroup','itemModelName','itemSupplier','itemCategory',
                                 'quantity','itemStatus','viewDoc'];


  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) {}


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isEditable=true;
  }


  Discom:string='MVVNL';
  loadData():void{
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    // queryParams['discom']=this.Discom;
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom']=this.Discom;


    this.restClient
      .getwithParam(environment.INVENTORY_INWARD_IMPORT_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: InwardImportListData[] = result.data.content as InwardImportListData[];

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
  fetchFilteredData(){

  }
//Show Details
  navToDetails(row:any){
    this.selectedIndex =1;
this.inwardImportResponse=row;
//      var queryParams: any ={};
//      queryParams['page']=this.currentPage;
//      queryParams['size']=this.pageSize;
//     //  queryParams['id']=row.id;

//      this.restClient.getwithParam(environment.INVENTORY_INWARD_IMPORT_DETAILS_DATA +"/"+ row.id,queryParams)
//      .subscribe({
//        next:(results:APIResponse) =>{
//          this.inwardImportResponse =results.data as InwardImportListData;


//          this.isNavigation= true;
//          this.selectedIndex= 1;
//         this.isEditable=true;
//        },
//        error:(err:any) => {
//          console.log(err);
//          let snackBarRef = this.snackBar.open('server error' ,'close',{
//            horizontalPosition:'center',
//           verticalPosition:'bottom',
//           duration :3000,
//                 });
// this.spinner = false;
//        },
//        complete: () => {
//          console.log('Inward Import List Fetch Complete');
//          this.spinner =false;
//        },
//       });
  }
  addNewInwardImport():void{
    this.inwardImportResponse={
      id: '',
  discom:  '',
  warehouseName:  '',
  supplier:  '',
  invoiceNo:  '',
  invoiceDate:  '',
  ginNo:  '',
  ginDate:  '',
  itemGroup:  '',
  itemModelName:  '',
  itemSupplier:  '',
  itemCategory:  '',
  quantity:  0,
  itemStatus:  '',
  transporter:  '',
  lrNo:  '',
  lrDate:'',
  vehicleNo:  '',
  driverName:  '',
  contactNo:  '',
  remark:  '',
  //warrantyMonth:  '',
  pdiDate:  '',
  stockType: '',
  // dataFileId:'',
  // documentId:'',
  // aimsInwardSupplierDetails:[]

    }
    this.isNavigation=false;
    this.selectedIndex=1;
  }
  onChangePage(pe: PageEvent) {
    // this.pageSize = pe.pageSize;
    // this.currentPage = pe.pageIndex;
    // if (this.filtered) {
    //   this.fetchFilteredData();
    // } else {
    //   this.loadData();
    // }
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.Discom;

    this.restClient
      .getwithParam(environment.INVENTORY_INWARD_IMPORT_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: InwardImportListData[] = result.data.content as InwardImportListData[];

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
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
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
    queryParams['supplier'] = this.supplierSearch;
    queryParams['itemGroup'] = this.itemGroupSearch;
    queryParams['itemModelName'] = this.itemModelNameSearch;

    this.restClient.getwithParam('/inventory/filterReturnToSupplier',queryParams)
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

export interface InwardImportListData{
  id: string
  discom: string
  warehouseName: string
  supplier: string
  invoiceNo: string
  invoiceDate: string
  ginNo: string
  ginDate: string
  itemGroup: string
  itemModelName: string
  itemSupplier: string
  itemCategory: string
  quantity: number
  itemStatus: string
  transporter: string
  lrNo: string
  lrDate:string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
  //warrantyMonth: string
  pdiDate: string
  stockType:string
  // dataFileId:any
  // documentId:any
  // aimsInwardSupplierDetails:[]
}

export interface RoleList {
  discom?: string;
  supplier?:string;
  itemGroup? :string;
  itemModelName? : string;
}

